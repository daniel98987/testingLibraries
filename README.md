# NotificationPopup

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.0.

## test

## How to use notifications

```bash
> Install it from npm
> Import NotificationModule in the project´s app.module.ts
> Import the NotificationService in the component where required
> Import PopupModule in the project´s app.module.ts
> Import the PopupService in the component where required
```

Import the following styles in the angular.json file. (projects > architect > styles):

```css
"styles":["node_modules/ngx-toastr/toastr.css","node_modules/davi-sfmo-notification-lib/src/notification/styles/style.scss"
] ;
```

## Code scaffolding

Run `ng generate component component-name --project davi-sfmo-notification-lib` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project davi-sfmo-notification-lib`.

> Note: Don't forget to add `--project davi-sfmo-notification-lib` or else it will be added to the default project in your `angular.json` file.

## Build

Run `ng build davi-sfmo-notification-lib` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build davi-sfmo-notification-lib`, go to the dist folder `cd dist/davi-sfmo-notification-lib` and run `npm publish`.

## Running unit tests

Run `ng test davi-sfmo-notification-lib` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
