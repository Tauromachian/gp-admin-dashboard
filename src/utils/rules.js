import { isNumber, isPhone, isEmail, isSentence } from "./regex";

export { ip } from "./rules-ip";

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
