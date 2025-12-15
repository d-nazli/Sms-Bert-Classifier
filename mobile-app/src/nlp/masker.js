export function maskText(text) {
  let masked = text;

  // 🔴 URL (http, https, www)
  const urlRegex =
    /\b((https?:\/\/|www\.)[^\s]+)/gi;
  masked = masked.replace(urlRegex, "<URL>");

  // 🔴 PHONE (Türkiye + genel)
  const phoneRegex =
    /(\+?\d{1,3}[\s-]?)?(\(?\d{2,4}\)?[\s-]?)?[\d\s-]{7,15}/g;
  masked = masked.replace(phoneRegex, "<PHONE>");

  // 🔴 PRICE (TL, ₺)
  const priceRegex =
    /\b\d{1,3}([.,]\d{3})*([.,]\d+)?\s?(TL|₺)\b/gi;
  masked = masked.replace(priceRegex, "<PRICE>");

  // 🔴 PERCENT (%)
  const percentRegex =
    /%\s?\d+([.,]\d+)?/g;
  masked = masked.replace(percentRegex, "<PERCENT>");

  return masked;
}
