n-desktop-app-banner [![Circle CI](https://circleci.com/gh/Financial-Times/n-desktop-app-banner/tree/master.svg?style=svg)](https://circleci.com/gh/Financial-Times/n-desktop-app-banner/tree/master)
=================

Bower component/Node module for the desktop app banner shown to new users.

----

## Usage

### Template

```
{{ n-desktop-app-banner/templates/banner }}
```

### CSS

```
@import 'n-desktop-app-banner/main';
```

### JS

```
import DesktopAppBanner from '@financial-times/n-desktop-app-banner';

new DesktopAppBanner();
```

## Demo

To run the demo, run `make init` followd by `make demo`. You should now be able to access this at <http://local.ft.com:5005>... the send email response for the demo is built to always be successful... if you want to see the failed state, update </demos/app.js#L30> to return a status other than `200`.
