export default (promise, signal = null) => {
  return new Promise((resolve, reject) => {
    const abortHandler = () => reject(new DOMException("Promise Aborted", "AbortError"));
    signal?.addEventListener("abort", abortHandler);

    promise
      .then((value) => (signal?.aborted ? null : resolve(value)))
      .catch((error) => reject(error))
      .finally(() => signal?.removeEventListener("abort", abortHandler));
  });
};
