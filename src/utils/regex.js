const numberRegex = /^[0-9]+$/;
const lettersRegex = /^([a-zA-Z])+$/;
const lettersBlankSpacesRegex = /^([a-zA-Z ])+$/;
const numberLettersBlankSpacesRegex = /^([0-9a-zA-Z ])+$/;
const emailRegex = /^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

const isNumber = string => {
  return numberRegex.test(string);
};

const isOnlyLetters = string => {
  return lettersRegex.test(string);
};

const isLettersWithBlankSpaces = string => {
  return lettersBlankSpacesRegex.test(string);
};

const isNumberAndLettersWithWhiteSpaces = string => {
  return numberLettersBlankSpacesRegex.test(string);
};

const isEmail = string => {
  return emailRegex.test(string);
}

module.exports = {
  isNumber,
  isOnlyLetters,
  isLettersWithBlankSpaces,
  isNumberAndLettersWithWhiteSpaces,
  isEmail
};
