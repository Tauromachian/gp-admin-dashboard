export function ip(message = "El formato del ip no es válido") {
  return (v) => {
    const { ip, mask } = splitIpFromMask(v);

    if (!isIp(ip)) {
      return message;
    }

    if (mask === "") {
      return true;
    }

    if (!isMask(mask)) {
      return message;
    }

    return true;
  };
}

function splitIpFromMask(completeIp) {
  const ipNumberAndMask = completeIp.split("/");

  return {
    ip: ipNumberAndMask[0],
    mask: ipNumberAndMask[1],
  };
}

function isMask(maskNumber) {
  if (!maskNumber) {
    return true;
  }

  return +maskNumber > 0 && +maskNumber < 32;
}

function isIp(ipNumber) {
  if (!ipNumber.includes(".")) {
    return false;
  }

  const ipNumbers = ipNumber.split(".");

  if (ipNumbers.length !== 4) {
    return false;
  }

  for (const ipNumber of ipNumbers) {
    if (!isIpNumber(ipNumber)) {
      return false;
    }
  }

  return true;
}

function isIpNumber(ipNumber) {
  if (isNaN(ipNumber)) return false;

  return +ipNumber >= 0 && +ipNumber <= 255;
}
