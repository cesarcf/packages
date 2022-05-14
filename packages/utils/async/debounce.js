export default (cb, wait) => {
  let timeOutID;

  (...args) => {
    clearTimeout(timeOutID);
    timeOutID = setTimeout(() => cb(...args), wait);
  };
};
