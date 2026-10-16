// Dependency-free replacement for currency-symbol-map, covering the currencies
// commerce storefronts actually encounter. Returns undefined for unknown codes
// (same semantics as the library it replaces).
const CURRENCY_SYMBOLS = {
    INR: '₹', USD: '$', EUR: '€', GBP: '£', JPY: '¥', CNY: '¥', KRW: '₩',
    AUD: 'A$', CAD: 'CA$', NZD: 'NZ$', SGD: 'S$', HKD: 'HK$', TWD: 'NT$',
    AED: 'د.إ', SAR: '﷼', QAR: 'QR', KWD: 'KD', BHD: 'BD', OMR: 'OMR', JOD: 'JD',
    MYR: 'RM', THB: '฿', IDR: 'Rp', PHP: '₱', VND: '₫',
    BRL: 'R$', MXN: 'MX$', ARS: 'AR$', CLP: 'CLP$', COP: 'COL$',
    ZAR: 'R', NGN: '₦', KES: 'KSh', EGP: 'E£', GHS: 'GH₵',
    TRY: '₺', RUB: '₽', PLN: 'zł', CZK: 'Kč', HUF: 'Ft', RON: 'lei',
    SEK: 'kr', NOK: 'kr', DKK: 'kr', CHF: 'CHF', ILS: '₪',
    PKR: '₨', BDT: '৳', LKR: 'Rs', NPR: 'Rs', MMK: 'K', KHR: '៛',
};

export default function getSymbolFromCurrency(currencyCode) {
    if (!currencyCode || typeof currencyCode !== 'string') return undefined;
    return CURRENCY_SYMBOLS[currencyCode.toUpperCase().trim()];
}
