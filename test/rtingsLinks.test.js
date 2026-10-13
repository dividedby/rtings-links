'use strict';
// Runs the userscript against hand-made fakes of document, window and links.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const src = fs.readFileSync(path.join(__dirname, '..', 'rtingsLinks.user.js'), 'utf8');

// Loads the script; returns its click handler and the window.open calls.
const load = () => {
  const listeners = [];
  const opened = [];
  const document = { addEventListener: (type, fn, capture) => listeners.push({ type, fn, capture }) };
  const window = { open: (...args) => opened.push(args) };
  new Function('window', 'document', src)(window, document);
  assert.equal(listeners.length, 1);
  assert.equal(listeners[0].type, 'click');
  assert.equal(listeners[0].capture, true);
  return { click: listeners[0].fn, opened };
};

const linkTo = href => {
  const u = new URL(href);
  return { href: u.href, protocol: u.protocol, hostname: u.hostname };
};

// A click on a target inside `link` (null: not inside a link).
const clickEvent = (link, mods = {}) => {
  const e = {
    button: 0, metaKey: false, ctrlKey: false, shiftKey: false, altKey: false, ...mods,
    prevented: false, stopped: false,
    target: { closest: sel => (sel === 'a[href]' ? link : null) },
    preventDefault() { e.prevented = true; },
    stopPropagation() { e.stopped = true; },
  };
  return e;
};

const untouched = (e, opened) => {
  assert.equal(e.prevented, false);
  assert.equal(e.stopped, false);
  assert.equal(opened.length, 0);
};

test('plain left click on an external link opens it in a new tab', () => {
  for (const href of ['https://www.amazon.com/dp/B0TEST?tag=x', 'http://www.bestbuy.com/site/1']) {
    const { click, opened } = load();
    const e = clickEvent(linkTo(href));
    click(e);
    assert.equal(e.prevented, true);
    assert.equal(e.stopped, true);
    assert.deepEqual(opened, [[new URL(href).href, '_blank', 'noopener,noreferrer']]);
  }
});

test('links to rtings.com and its subdomains are left alone', () => {
  for (const href of ['https://rtings.com/tv', 'https://www.rtings.com/tv/reviews', 'https://shop.rtings.com/x']) {
    const { click, opened } = load();
    const e = clickEvent(linkTo(href));
    click(e);
    untouched(e, opened);
  }
});

test('look-alike hosts still count as external', () => {
  const { click, opened } = load();
  const e = clickEvent(linkTo('https://notrtings.com/x'));
  click(e);
  assert.equal(opened.length, 1);
});

test('modified and non-left clicks are left to the browser', () => {
  const cases = [{ ctrlKey: true }, { metaKey: true }, { shiftKey: true }, { altKey: true }, { button: 1 }, { button: 2 }];
  for (const mods of cases) {
    const { click, opened } = load();
    const e = clickEvent(linkTo('https://www.amazon.com/dp/B0TEST'), mods);
    click(e);
    untouched(e, opened);
  }
});

test('non-http links are left alone', () => {
  for (const href of ['mailto:someone@example.com', 'javascript:void(0)']) {
    const { click, opened } = load();
    const e = clickEvent(linkTo(href));
    click(e);
    untouched(e, opened);
  }
});

test('clicks outside any link are left alone', () => {
  const { click, opened } = load();
  const e = clickEvent(null);
  click(e);
  untouched(e, opened);
});
