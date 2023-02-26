let timer;
export default function debounce(func, timeout = 400) {
  clearTimeout(timer);
  timer = setTimeout(() => {
    func();
  }, timeout);
}
