# Cancelable Promise

```javascript
import fetch from "node-fetch";
import abortController from "./abort-controller";
import cancelablePromise from "./cancelable-promise";

const { controller, signal } = abortController();
cancelablePromise(fetch("https://jsonplaceholder.typicode.com/posts"), signal)
  .then((res) => res.json())
  .then((res) => console.log("done!", res))
  .catch((err) => {
    if (err.name === "AbortError") {
      console.log("manually aborted: ", err.message);
    }
  });

setTimeout(() => controller.abort(), 40);
```