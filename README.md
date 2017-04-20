# AngularJS Blocking Promise Manager

Wraps groups of AngularJS promises. It's like thread synchronization for your promises.

## Installation

Install the dependency with Bower or whatever you prefer.

`bower install https://github.com/zero-degrees/angularjs-blocking-promise-manager.git --save`

Include the file.

```html
<script src="/bower_components/angularjs-blocking-promise-manager/angular-blocking-promise-manager.min.js"></script>
```

Add the module to your AngularJS app's dependencies.

```javascript
angular.module('MyAngularApp', ['BlockingPromiseManager']);
```

You can attach the BlockingPromiseManager to your scope if you'd like to use it to display an AJAX loading overlay.

```javascript
$rootScope.BlockingPromiseManager = BlockingPromiseManager;
```

```html
<div id="loadingOverlay" ng-if="BlockingPromiseManager.count() > 0">Loading...</div>
```

Register your blocking promises -- $http requests, for example.

```javascript
var promise = $http.get('http://www.example.com');
BlockingPromiseManager.add(promise);
```

Execute code when all promises have completed.

```javascript
BlockingPromiseManager.then(function () {
    alert('All blocking promises complete.');
});
```