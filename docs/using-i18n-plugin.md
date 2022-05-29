# Using vue-i18n plugin

We are now using the [Vue-i18n](https://vue-i18n.intlify.dev) plugin to deal with the text content
in the app, just in case when we might have to go international one day.

Whenever you generate new views / component with the `plop` script. It already automatically generate
a new i18n file for you in the `src/i18n/en/` folder, also the script will automatically insert the namespace
into the `src/i18n/en/index.js` (please do not modify this file manually unless you know what you are doing).  

The first fully integrated example is the
`src/en/customize-lock.js` and the component in `src/views/CustomizeLock/CustomizedLock.vue`.
It contains just about any example you might want to know how to use i18n plugin in your component.

We are going to use this component as example to show you how to use it.

## Basic

First thing is take a look at the `src/i18n/en/index.js`. And see how it export the namespace.

```js
...
import customizeLock from './customize-lock';
...
// mergeDeep is a function we create to deep merge all the export into one object
export const en = mergeDeep(
  { customizeLock },
)
```

And you can see it's using camel case to name that translate file content. This is important, because
when it gets to your component. You will have to prefix all your key with this namespace.

Now look at the `src/views/CustomizeLock/CustomizedLock.vue` component file.

```html
<h1 class="heading">{{ $t("customizeLock.heading") }}</h1>
<span class="customize-lock-helping-text">
  {{ $t("customizeLock.desc") }}
</span>
```

When it renders, the correspond content from `customizeLock.heading` and `customizeLock.desc` will get replace using the
`$t` function. And base on the language setting, the system will know which language file to use.

## Using $t with attribute

Sometime you need to have translate content within a tag but you can not use `{{}}` syntax.

Take a look at this example:

```html
<v-select
  :items="templates"
  background-color="#2a2a2d"
  :placeholder="$t('customizeLock.template')"
  height="60px"
  v-model="selectTemplate"
  item-text="title"
  item-value="value"
  filled
  required
  solo
  class="v-text-field--solo-flat"
  :rules="[(v) => !!v || 'Please select a template']"
  return-object
  @change="selectTemplateType(selectTemplate.value)"
></v-select>
```

See the `:placeholder` is directly using the `$t` function inside. But remember, you can not use just `placeholder`
it must bind as a prop to the tag to make this happen.

## Content with HTML code

Sometime we might have a big paragraph of text with html tags to decorate it. Since this is our own content, therefore
we can trust it to use the vue `v-html` directive:

```html
<div class="tooltip-text" v-html='$t("customizeLock.tooltipText")'>
</div>
```

## Using translate inside script

Instead of using just `$t` you will have to change to `this.$t` this is already injected to the system during init.

```js
...
templates: [
  { title: this.$t("customizeLock.linear"), value: "linear" },
  { title: this.$t("customizeLock.exponential"), value: "exponential" },
  { title: this.$t("customizeLock.inverse"), value: "inverse" },
  { title: this.$t("customizeLock.custom"), value: "custom" },
],
...
```

## Tips and tricks

The Vue-i18n plugin has a neat trick, that is during development, you don't really need to have those keys ready.
What is will do is just to display the key name, for example, you have this new `customizeLock.newBitOfText`,
you can just stub it in first.

```html
<p>{{$t("customizeLock.newBitOfText")}}</p>
```

Then later on you can add it back to the `src/i18n/en/customize-lock.js`

```js
{
  newBitOfText: "Some text should be show here"
}
```

## Advance usage

What is you have text that you need to translate outside of the component?
Yes you can, by import the plugin definition directly. You can see how it works in
the `src/router/routes.js`

In there, we import a new function

```js
import { $t } from "@/i18n/t";
```

And the file in `src/i18n/t.js`:

```js
import i18n from "./index";
// keep the naming convention
export const $t = (k) => i18n.t(k);
```

It just a very simple wrapper method that follow the same naming convention as in the component. The cool thing, it works exactly the same like you are in a component.


## What we can do in the future

The core definition of the Vue i18n plugin is in the `src/i18n/index.js`

This get injected into the system wide. We could perhaps write a script to detect the user's browser language
setting and determine the default language for them (of course, better ask first) also we could use the
Vuex store to create a little widget of dropdown that allow the user to switch between different languages.
That will be in the future discussion.


---
Last update: 26 Aug 2021 Joel Chu - change the advance usage to the route.js
Last update: 23 Aug 2021 Joel Chu
