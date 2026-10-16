import { Platform } from 'react-native';

// H.264 encodes in 16x16 macroblocks, so a video whose dimensions aren't
// multiples of 16 is CODED larger than it displays and cropped back via the SPS
// crop rectangle (338x600 is coded 352x608 — 14 spare columns, 8 spare rows).
//
// Decoders that honour the crop hide those. Some do not — confirmed on an
// Infinix X6739 (MediaTek Dimensity 1200, Android 13) against Jockey's own tile
// videos, where a band of static padding renders down the tile's right edge and
// reads as "the next video leaking into the current one".
//
// FIX SHAPE: shrink the CLIPPING PARENT by the padding fraction, leaving the
// <Video> box untouched so the player's own layout is not perturbed. Two other
// shapes were tried and measured on device; both failed, because the player
// refits its content into whatever box it is given:
//   * transform: scale       band got WORSE, 16px -> 44px
//   * oversized video box    band remained
//
// COST: the clip removes ~4% of tile width where the observed band is ~2%, so a
// sliver of real picture goes with it (a top-right logo is clipped on some
// clips). That is only worth paying on decoders that actually misbehave, hence
// the gate below.
//
// GATE — read this before extending it. The chipset is NOT reachable from JS:
// Platform.constants on Android exposes only Brand/Manufacturer/Model/
// Fingerprint, not ro.board.platform, and the SDK has a zero-runtime-dependency
// rule so react-native-device-info is not an option. This is therefore a BRAND
// HEURISTIC, not chipset detection, and it is wrong in both directions:
//   - Transsion (Infinix/Tecno/itel) is effectively all MediaTek -> good signal
//   - Xiaomi/Redmi/POCO is MIXED; Snapdragon models here pay the clip for
//     nothing (both reported devices, Redmi Note 8 Pro and Redmi 10, are
//     MediaTek, so they are covered)
//   - a MediaTek device from a brand not listed keeps the band
// iOS and every unlisted Android keep the full tile.
//

const CROP_FACTOR = 0.70;

const AFFECTED_BRANDS = ['infinix', 'tecno', 'itel', 'xiaomi', 'redmi', 'poco'];

function decoderMayIgnoreCrop() {
    if (Platform.OS !== 'android') return false;
    const c = Platform.constants || {};
    const id = `${c.Brand || ''} ${c.Manufacturer || ''} ${c.Model || ''}`.toLowerCase();
    return AFFECTED_BRANDS.some((b) => id.includes(b));
}

// Coded size for a display size: round up to the next multiple of 16.
export function codedSize(n) {
    if (!n || n <= 0) return 0;
    return Math.ceil(n / 16) * 16;
}

// Fraction of the coded frame that is padding, on one axis.
export function padFraction(n) {
    const coded = codedSize(n);
    return coded === 0 ? 0 : (coded - n) / coded;
}

// How much of the tile to clip away, per axis. Returns null — meaning leave the
// tile completely alone — when the video is already macroblock-aligned, or when
// the device is not one whose decoder is known to render the padding.
export function padCropLayout(naturalWidth, naturalHeight) {
    if (!decoderMayIgnoreCrop()) return null;
    const widthFraction = padFraction(naturalWidth) * CROP_FACTOR;
    const heightFraction = padFraction(naturalHeight) * CROP_FACTOR;
    if (widthFraction === 0 && heightFraction === 0) return null;
    return { widthFraction, heightFraction };
}
