# sunmao-ui-start

✨ This is a sunmao project for the beginners.

## Project struct

```
├── editor  # the codes of editor
├── index.html
├── public
|  └── assets  # the static assets
├── scripts  # the useful assistant scripts
├── src
|  ├── SunmaoApp.tsx  # the sunmao app component
|  ├── applications  # the sunmao application schemas
|  ├── components  # the react components folder
|  ├── constants
|  ├── locales  # i18n
|  ├── main.tsx  # entry file
|  ├── modules  # the module schemas
|  ├── routes.ts  # the routes config
|  ├── runtime.config.ts  # the sunmao runtime config
|  ├── styles  # the style files
|  ├── sunmao  # the sunmao lib
|  |  ├── components # the implements of the sunmao components
|  |  ├── lib.ts
|  |  ├── methods  # the implements of the util methods
|  |  ├── traits  # the implements of the trait
|  |  └── widgets  # the implements of the widgets
|  └── utils
├── tools  # the vite plugins
|  └── vite-plugin-sunmao-fs.ts
```

## Development

### Install & Launch

You should install the dependencies first.

```bash
yarn
```

And then you can launch the sunmao editor and application to develop.

```bash
# launch the sunmao editor
npm run dev
# launch the sunmao app
npm run dev:app
```

### Useful scripts

There are some useful npm script could help you develop faster.

```bash
# create a new application
npm run add:app -- --name home --path /home
# create a component
npm run add:component -- --version custom/v1 --name button
# create a trait
npm run add:trait -- --version custom/v1 --name validation
# create a util method
npm run add:utilMethod -- --version custom/v1 --name alert
```

## Build

```bash
npm run build
```
