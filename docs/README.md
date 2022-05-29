# Mintr App

> This is a base template for creating new project. First fork from this repo, then create your new project.

This code base uses the following modules:

- Vue V2
- Vuex
- Vue-router
- Vue-test-utils
- Vue-i18n
- Vuetify
- Bootstrap

Also, we have include a micro generator plop (How to in the bottom of this README)

## How to create new repo from this one

First clone this repo and rename:

```sh
$ git clone git@github.com:Polkalokr/pl-vue-template.git <your-new-project-name>
```
Replace the `<your-new-project-name>` with your project name.

Then go back to Github and create a new empty repo with the name you just created.

```sh
$ git remote set-url origin git@github.com:Polkalokr/your-new-project-name.git
```

You can double check it by

```sh
$ git remote -v
```

And it should match the name you just supplied. Then push to your new repo url.

---

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

---

## Using the `plop` micro generator

`plop` is a code generator that will help you to generate require files.


To see the list of available plop modules, just run

```sh
$ npm run plop
```

It will show you the list of available modules. Then select the one you want.
But after a while, you remember which one you want, you can do so in a short cut style.
For example, you want to generate a new component

```sh
$ npm run plop component
```

And it will take you straight to the relevant plop module.

---

V.1.0 08-2021 Joel Chu <joelchu1329@outlook.com>
V.1.1 add [Docsify](https://docsify.js.org/#/quickstart) documentation system
