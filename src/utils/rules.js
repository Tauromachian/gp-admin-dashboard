import { isNumber, isPhone, isEmail, isSentence } from "./regex";

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

export function min(
  min = 6,
  message = "Este campo debe tener un número de caracteres mayor a"
) {
  const finalMessage = message ? message : `${message} ${min} letras`;

  return (v) => v.length >= min || finalMessage;
}

export function password() {
  return (v) => {
    if (!v) return "La contraseña es requerida";

    if (v.length < 8) return "La contraseña debe tener 8 caracteres o más";

    return true;
  };
}
