# Using Vue Chartjs with Vuex

To start with, why we need to use Vuex to pass data to the component instead of just using props.

The reason is we want to decoupling the component(s), and allow it to be reusable throughout the app.

We will be using the chart system as an example.

## How do we use the Vue Chartjs

The first chart we define is in `src/components/Charts/LineChart.js`.

It's really simple:

```js
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ['options'],
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
```

You might ask where the `this.chartData` comes from. This is created by `VueChartJs` when we use the `reactiveProp` mixin.
This is how the chart will able to react to the new flow of data in a reactive style (re-draw chart without re-render the entire chart). But the configuration options is not reactive, therefore we define a props call `options` as seen above, and provide
by it's parent component.

But we are not going to use this directly. Whenever you need to use this chart. You will have to create a wrapper component.
Next take a look at the `src/views/CustomizeLock/LineChartWrapper/LineChartWrapper.vue`.

```html
<template>
  <LineCharts :options="getOptions" :chartData="getChartData" v-if="display"></LineCharts>
</template>

<script>
import LineCharts from "@/components/Charts/LineChart";
import { mapState, mapGetters } from "vuex";

export default {
  name: "LineChartWrapper",
  props: {
  },
  computed: {
    ...mapGetters('chartData', [
      "getOptions",
      "getChartData"
    ]),
    ...mapState('chartData', {
      display: state => state.show
    }),
  },
  components: {
    LineCharts
  }
};
</script>
```

This component is also very simple; the purpose for this wrapper is to bind the Vuex store to the chart.
Using the `mapState` and `mapGetters` method to get the data out for Vuex store.

Again, you should able to see the Vuex store is also using namespace `chartData`, and you will find
the file in `src/store/modules/chart-data.js`

## What is the state `display` for?

Remember we talk about the `options` in the `VueChartJs` is not reactive. Therefore whenever we need
to apply new configuration to the chart. We need to destroy it first. Then supply the new option, then
rebuild it. The following code is exactly how we did it.

```js
// in CustomizLock.vue
methods: {
  ...
  selectTemplateType(value) {
    this.setShow(false);
    this.$nextTick(() => {
      this.updateOptions(value);
      this.setShow(true);
    });
  },
}
```

One thing worth mention is, we first set the show to false (`v-if=display` will turn off and remove the component from the DOM,
  therefore destroy the chart within it). Also it's not necessary to pass the show to display, we could just use the `show`
  state from Vuex store directly. Doing it this way is for demo purpose.

Next thing is, we wrap the next code inside the `$nextTick`, you can just use `setTimeout` and give it `0` as delay time. It works the same. By using `$nextTick` is more correct Vue way. The reason is we first turn it off, and in the next vue internal state
update, we provide the new options, then turn it on (therefore chart get re-render) again. If you don't wrap that code, it won't work.

## What's next @TODO

First thing is, after viewing this example, the next thing will be binding all the form data to the Vuex store.
When the user start editing the form (chart) and we store the data within the store state (mutation the state).
When the user ready then we can submit it to the backend (using action which is async).

## Summary

Here is a graph to show the structure / relation of these components:

<pre>
+-----------------+
|     VIEW        |  The top level
+-----------------+
|  WRAPPER (store)|  The data binding layer
+-----------------+
|  Charts/chart.js|  The actual chart (that can be re-use)
+-----------------+
</pre>

For example, in another view that we need another line chart, we just need to create a new wrapper
component and bind it to a different store that provide the `options`, and `chartData` and you get your chart.

Or we need different type of chart. We just need to create a new file in the `src/components/Charts` that extend
from a different chart. And you get a brand new chart type.

---

Last update: 23-08-2021 Joel Chu
