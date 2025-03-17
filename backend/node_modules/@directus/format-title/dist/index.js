// src/utils/decamelize.ts
function decamelize(string) {
  return string.replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/([A-Z]+)([A-Z][a-z\d]+)/g, "$1_$2").toLowerCase();
}

// src/utils/capitalize.ts
function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.substring(1);
}

// src/constants/acronyms.ts
var acronyms_default = [
  "2D",
  "3D",
  "4WD",
  "A2O",
  "AI",
  "API",
  "BIOS",
  "CC",
  "CCTV",
  "CCV",
  "CD",
  "CD-ROM",
  "CIA",
  "CMS",
  "COBOL",
  "CSS",
  "CSV",
  "CV",
  "DB",
  "DIY",
  "DNA",
  "DVD",
  "E3",
  "EIN",
  "ESPN",
  "FAQ",
  "FAQs",
  "FBI",
  "FORTRAN",
  "FPS",
  "FTP",
  "HTML",
  "HTTP",
  "HTTPS",
  "ID",
  "IP",
  "ISO",
  "JS",
  "JSON",
  "LASER",
  "M2A",
  "M2M",
  "M2MM",
  "M2O",
  "MMORPG",
  "NAFTA",
  "NASA",
  "NDA",
  "O2A",
  "O2M",
  "PDF",
  "PHP",
  "POP",
  "RAM",
  "RNGR",
  "ROM",
  "RPG",
  "RTFM",
  "RTS",
  "SCUBA",
  "SDK",
  "SITCOM",
  "SKU",
  "SMTP",
  "SQL",
  "SSL",
  "SSN",
  "SWAT",
  "TBS",
  "TLS",
  "TNA",
  "TS",
  "TTL",
  "TV",
  "UI",
  "URL",
  "USB",
  "UWP",
  "VIP",
  "W3C",
  "WWE",
  "WWF",
  "WWW",
  "WYSIWYG"
];

// src/constants/articles.ts
var articles_default = ["a", "an", "the"];

// src/constants/conjunctions.ts
var conjunctions_default = [
  "and",
  "that",
  "but",
  "or",
  "as",
  "if",
  "when",
  "than",
  "because",
  "while",
  "where",
  "after",
  "so",
  "though",
  "since",
  "until",
  "whether",
  "before",
  "although",
  "nor",
  "like",
  "once",
  "unless",
  "now",
  "except"
];

// src/constants/prepositions.ts
var prepositions_default = [
  "about",
  "above",
  "across",
  "after",
  "against",
  "along",
  "among",
  "around",
  "at",
  "because of",
  "before",
  "behind",
  "below",
  "beneath",
  "beside",
  "besides",
  "between",
  "beyond",
  "but",
  "by",
  "concerning",
  "despite",
  "down",
  "during",
  "except",
  "excepting",
  "for",
  "from",
  "in",
  "in front of",
  "inside",
  "in spite of",
  "instead of",
  "into",
  "like",
  "near",
  "of",
  "off",
  "on",
  "onto",
  "out",
  "outside",
  "over",
  "past",
  "regarding",
  "since",
  "through",
  "throughout",
  "to",
  "toward",
  "under",
  "underneath",
  "until",
  "up",
  "upon",
  "up to",
  "with",
  "within",
  "without",
  "with regard to",
  "with respect to"
];

// src/constants/special-case.ts
var special_case_default = [
  "2FA",
  "4K",
  "5K",
  "8K",
  "AGI",
  "BI",
  "ChatGPT",
  "CTA",
  "DateTime",
  "FMS",
  "GitHub",
  "GPT",
  "HD",
  "IBMid",
  "IDs",
  "iMac",
  "IMAX",
  "iOS",
  "iPad",
  "iPhone",
  "iPod",
  "LDAP",
  "LinkedIn",
  "LLM",
  "macOS",
  "McDonalds",
  "ML",
  "MySQL",
  "NLG",
  "NLP",
  "NLU",
  "OpenAI",
  "PDFs",
  "PIM",
  "PEFT",
  "pH",
  "PostgreSQL",
  "SEO",
  "TTS",
  "UHD",
  "UUID",
  "XSS",
  "YouTube"
];

// src/utils/handle-special-words.ts
function handleSpecialWords(str, index, words) {
  const lowercaseStr = str.toLowerCase();
  const uppercaseStr = str.toUpperCase();
  for (const special of special_case_default) {
    if (special.toLowerCase() === lowercaseStr) return special;
  }
  if (acronyms_default.includes(uppercaseStr)) return uppercaseStr;
  if (index === 0) return str;
  if (index === words.length - 1) return str;
  if (str.length >= 4) return str;
  if (prepositions_default.includes(lowercaseStr)) return lowercaseStr;
  if (conjunctions_default.includes(lowercaseStr)) return lowercaseStr;
  if (articles_default.includes(lowercaseStr)) return lowercaseStr;
  return str;
}

// src/utils/combine.ts
function combine(acc, str) {
  return `${acc} ${str}`;
}

// src/index.ts
function formatTitle(title, separator = new RegExp("\\s|-|_", "g")) {
  return decamelize(title).split(separator).map(capitalize).map(handleSpecialWords).reduce(combine);
}
var index_default = formatTitle;
export {
  index_default as default,
  formatTitle
};
