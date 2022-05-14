export default (cb, wait) => {
  let throttle;

  return (...args) => {
    if (throttle) return;

    throttle = true;
    setTimeout(() => {
      cb(...args);
      throttle = false;
    }, wait);
  };
};
