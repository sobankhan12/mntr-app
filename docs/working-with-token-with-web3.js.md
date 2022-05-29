# Working with Token with web3.js

We have put the connection code in a Vuex store `src/store/modules/ethereum.js`

In there, all the executions happen in the `action` call because they are async call
and we commit (mutation) the state within it. Then you can get the result back
from the Vuex store state, or create getter (computed) to tailor for your need.

From what I understand by reading the code. Import the `web3.js` code will create a
global object which can be access via `window.ethereum`. Then when your wallet
connect with the browser, that object will able to query the data that we need.

For example (the connect):

```js
async connectMetamask() {
  await window.ethereum.enable();
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  return await provider.getBlockNumber();
},
```

The static property can be access directly like so:

```js
async getActualBalance({ commit }) {
  if (window.ethereum.selectedAddress) {
  }
}
```

And for live data using observer style pattern like so:

```js
getAddress({ commit }) {
  window.ethereum.on("accountsChanged", (accounts) => {
    // let accountAddress = document.querySelector(".account-address");
    // accountAddress.innerHTML = accounts[0].slice(0, -54) + "...";
    commit("updateAddress", {
      type: "accountsChanged",
      addr: accounts[0]
    });
  });
},
```

For complete API reference please visit [web3.js](https://web3js.readthedocs.io/en/v1.4.0/) (V.1.4.0)

---

Last update: 23-08-2021 Joel Chu
