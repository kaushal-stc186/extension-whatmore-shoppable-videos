// Appmaker delivers every extension setting as a STRING (settings-schema.json
// declares each field "type": "string", including the RangeSlider knobs). The
// SDK, however, does arithmetic on them — and "+" string-concatenates while "*"
// coerces, so e.g. `CARD_HEIGHT + margin` silently became "37210" instead of
// 382. Normalize types once here so every downstream consumer gets real
// numbers/booleans. Keys left absent fall through to the SDK's own defaults.
const NUMERIC_KEYS = [
    'videoTileSize',
    'videoTileSpacing',
    'videoTileRadius',
    'widgetMarginBottom',
    'fontSize',
];
const BOOLEAN_KEYS = ['showArrows', 'showProductDetails', 'showDiscountLabel'];

const isBlank = (v) => v === undefined || v === null || v === '';

const normalizeSettings = (raw) => {
    const out = { ...(raw || {}) };
    for (const key of NUMERIC_KEYS) {
        // Drop blank/garbage so the downstream `?? default` kicks in. Note ''
        // must be DROPPED not kept: `'' ?? 50` is '' (?? only defaults on
        // null/undefined), which would string-concat all over again.
        if (isBlank(out[key])) { delete out[key]; continue; }
        const n = Number(out[key]);
        if (Number.isFinite(n)) out[key] = n;
        else delete out[key];
    }
    for (const key of BOOLEAN_KEYS) {
        if (isBlank(out[key])) { delete out[key]; continue; }
        out[key] = out[key] === true || out[key] === 'true';
    }
    return out;
};

let settings = {};
const setSettings = (_settings) => {
    settings = normalizeSettings(_settings);
};
const getSettings = () => {
    return settings;
};
export { setSettings, getSettings, settings, normalizeSettings };
