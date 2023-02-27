import { isNumber } from "./regex";

export function required(message = "Este valor es requerido.") {
  return (v) => !!v || message;
}

export function number(message = "Este campo debe ser un número.") {
  return (v) => isNumber(v) || message;
}

export function password() {
  return (v) => {
    if (!v) return "La contraseña es requerida";

    if (v.length < 8) return "La contraseña debe tener 8 caracteres o más";

    return true;
  };
}
