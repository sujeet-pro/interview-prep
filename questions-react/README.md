# interview-evaluation-questions

## About the setup

This is a [Vite's MPA Setup](https://vite.dev/guide/build.html#multi-page-app)

## Apps

- All the apps are under folder `apps`
- Each app has its own folder and doesn't have any dependencies on other apps
- The index.html is the main entry point for the app
- The index.html is rendered using ejs, which contains the common header and footer (and is not rendered by react)

### When building a new app

- Do not update below files, since they are auto generatd and will be overwritten in next updated
  - `index.html`
  - `index.tsx`
  - `index.css`
- If you want to add new css, create a new file and import it into app.tsx.
- The main code starts from `app.tsx` file and any imports from other files will be bundled.

## Auto Generation of new apps

```sh
npm run app:gen
# enter the name of the app in kebab case (eg: file-explorer)
```

- This will create a new folder in the `apps` folder and copy the template files to the new app.
- It will also update the `index.html` to include the new app (at the root)

## Updating all the apps

```sh
npm run app:update
```

- This will update all the apps to the latest template
- If an app folder is deleted, it will remove it from the `index.html` as well.

### When to use auto update:

- Any app is deleted
- Changes in template files

> Not that it doesn't update app.tsx files, since each app will have updated that.
