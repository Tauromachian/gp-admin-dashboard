const numberRegex = /^[0-9]+$/;
const lettersRegex = /^([a-zA-Z])+$/;
const lettersBlankSpacesRegex = /^([a-zA-Z ])+$/;
const lettersBlankSpacesHyphenRegex = /^([a-zA-Z -])+$/;
const numberLettersRegex = /^([0-9a-zA-Z])+$/;
const numberLettersBlankSpacesRegex = /^([0-9a-zA-Z ])+$/;
const numberLettersHypenBlankSpacesRegex = /^([0-9a-zA-Z -])+$/;
const sentenceRegex = /^([0-9a-zA-Z -.:/])+$/;
const emailRegex =
  /^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

const monthSpanishRegex =
  /^enero|febrero|marzo|abril|mayo|junio|julio|agosto|octubre|diciembre|septiembre|noviembre$/;

const phoneRegex = /\(?([0-9]{3})?\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;

const isNumber = (string) => {
  return numberRegex.test(string);
};

const isOnlyLetters = (string) => {
  return lettersRegex.test(string);
};

const isNumberAndLetters = (string) => {
  return numberLettersRegex.test(string);
};

const isLettersWithBlankSpaces = (string) => {
  return lettersBlankSpacesRegex.test(string);
};

const isLettersWithBlankHyphenSpaces = (string) => {
  return lettersBlankSpacesHyphenRegex.test(string);
};

const isNumberAndLettersWithWhiteSpaces = (string) => {
  return numberLettersBlankSpacesRegex.test(string);
};

const isNumberAndLettersHyphenWithWhiteSpaces = (string) => {
  return numberLettersHypenBlankSpacesRegex.test(string);
};

const isSentence = (string) => {
  return sentenceRegex.test(string);
};

const isEmail = (string) => {
  return emailRegex.test(string);
};

const isMonthInSpanish = (string) => {
  return monthSpanishRegex.test(string);
};

const isPhone = (string) => {
  return phoneRegex.test(string);
};

export {
  isNumber,
  isOnlyLetters,
  isLettersWithBlankSpaces,
  isLettersWithBlankHyphenSpaces,
  isNumberAndLetters,
  isNumberAndLettersWithWhiteSpaces,
  isNumberAndLettersHyphenWithWhiteSpaces,
  isSentence,
  isEmail,
  isMonthInSpanish,
  isPhone,
};
