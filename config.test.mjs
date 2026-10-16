// Standalone assertion test — no jest needed.
//   run:  node packages/whatmore-shoppable-videos/config.test.mjs
// Proves normalizeSettings() turns Appmaker's string settings into real
// numbers/booleans, and that the container-height regression ("37210") is gone.
import { normalizeSettings } from './config.js';
import assert from 'node:assert/strict';

let passed = 0;
const check = (name, fn) => { fn(); passed++; console.log('  ok -', name); };

// mirror of the SDK's height math (EventTileWithProduct.js)
const containerHeight = (s) => {
    const CARD_HEIGHT = 40 * (s.videoTileSize ?? 5.5);
    const belowExtra = 52;
    const appMarginBottom = s.widgetMarginBottom ?? 50;
    return CARD_HEIGHT + belowExtra + appMarginBottom;
};

// Jockey UAT config, exactly as Appmaker delivers it (all strings)
const jockey = {
    videoTileSize: '8', videoTileSpacing: '2', videoTileRadius: '2',
    widgetMarginBottom: '10', fontSize: '20',
    showProductDetails: 'true', showArrows: 'false', showDiscountLabel: 'true',
    skin: 'standard', brandThemeColor: '',
};

check('numeric knobs become numbers', () => {
    const s = normalizeSettings(jockey);
    for (const k of ['videoTileSize', 'videoTileSpacing', 'videoTileRadius', 'widgetMarginBottom', 'fontSize'])
        assert.equal(typeof s[k], 'number', `${k} should be number`);
});

check('REGRESSION: container height is 382 (number), not "37210"', () => {
    const h = containerHeight(normalizeSettings(jockey));
    assert.equal(h, 382);
    assert.equal(typeof h, 'number');
});

check('proves the OLD bug: raw strings concat to "37210"', () => {
    assert.equal(containerHeight(jockey), '37210'); // string concat, the defect
});

check('boolean knobs become real booleans', () => {
    const s = normalizeSettings(jockey);
    assert.equal(s.showProductDetails, true);
    assert.equal(s.showArrows, false);
    assert.equal(s.showDiscountLabel, true);
    // the toggle bug: "false" !== false is always true -> never hides
    assert.equal(s.showProductDetails !== false, true);  // shown, correct
    assert.equal(normalizeSettings({ showProductDetails: 'false' }).showProductDetails !== false, false); // now hides
});

check('absent / blank keys fall through to SDK defaults', () => {
    const s = normalizeSettings({ widgetMarginBottom: '', videoTileSize: 'garbage' });
    assert.equal('widgetMarginBottom' in s, false); // blank dropped
    assert.equal('videoTileSize' in s, false);      // non-finite dropped
    assert.equal(s.widgetMarginBottom ?? 50, 50);   // default applies
    assert.equal(typeof (s.widgetMarginBottom ?? 50), 'number'); // and stays a number
});

check('already-typed values pass through unchanged', () => {
    const s = normalizeSettings({ videoTileSize: 8, showArrows: true });
    assert.equal(s.videoTileSize, 8);
    assert.equal(s.showArrows, true);
});

check('null / undefined input does not throw', () => {
    assert.deepEqual(normalizeSettings(null), {});
    assert.deepEqual(normalizeSettings(undefined), {});
});

console.log(`\n${passed} checks passed`);
