import { isNumber, isPhone, isEmail, isSentence } from "./regex";

export { ip } from "./rules-ip";

/**
 * This function is meant to be used as a helper in case there are optional fields.
 * @param {array} rules
 * @returns true if  no value is provided
 * @returns true if the value passes all the rules
 * @returns false if the value is provided and it does not pass all the rules
 */
export function optionalFieldHelper(rules) {
  return (v) => {
    if (!v) return true;

    for (const rule of rules) {
      const result = rule(v);

      if (result !== true) return result;
    }

    return true;
  };
}

export function required(message = "Este valor es requerido.") {
  return (v) => !!v || message;
}

export function number(message = "Este campo debe ser un número.") {
  return (v) => isNumber(v) || message;
}

export function phone(message = "El número de teléfono no es válido") {
  return (v) => isPhone(v) || message;
}

export function email(message = "El email no es válido") {
  return (v) => isEmail(v) || message;
}

export function sentence(message = "El formato no es válido") {
  return (v) => isSentence(v) || message;
}

export function confirm(
  toConfirm,
  message = "Los valores no son equivalentes"
) {
  return (v) => v === toConfirm || message;
}

export function min(min = 6, message) {
  const finalMessage = message
    ? message
    : `Cantidad mínima de ${min} letras requeridas`;

  return (v) => v.length >= min || finalMessage;
}

export function password() {
  return (v) => {
    if (!v) return "La contraseña es requerida";

    if (v.length < 8) return "La contraseña debe tener 8 caracteres o más";

    return true;
  };
}
