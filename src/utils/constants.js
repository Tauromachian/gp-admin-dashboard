let hostDir = import.meta.env.VITE_HOST_DIR;
let authDir = import.meta.env.VITE_AUTH_DIR;

export const HOST_DIR = appendSlash(hostDir);
export const AUTH_DIR = appendSlash(authDir);
export const API_DIR = `${HOST_DIR}`;

function appendSlash(url) {
  return url[url.length - 1] === "/" ? url : url + "/";
}
