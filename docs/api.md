# API

We explain the data structure of different APIs in this section.

## Customize Lock

Here we will being a [JSON API](https://jsonapi.org/) style call.

Example:

```js
{
  data: <payload>
}
```

The actual payload will be inside the data key, and we could add
more key to the root level for our own use. The data that will be
send to the block chain layer will take the following format.

```js
{[D/M/YYYY]: [DOUBLE 2 DECIMAL]}
```

So put them together will become:

```js
{
  data: [
    {"24/8/2021": 100.01},
    {"25/8/2021": 80.85}
  ]
}
```
---

Last update 24-08-2021 Joel Chu
