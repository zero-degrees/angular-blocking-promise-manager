# AngularJS Blocking Promise Manager

Like thread synchronization for your promises.

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

## Basic Usage

You can attach the BlockingPromiseManager to your scope if you'd like to use it to display an AJAX loading overlay.

```javascript
$scope.BlockingPromiseManager = BlockingPromiseManager;
```

```html
<div id="loadingOverlay" ng-if="BlockingPromiseManager.count() > 0">Loading...</div>
```

Register your blocking promises -- $http requests, for example. Promises will be registered to the "_default" group unless otherwise specified.

```javascript
//single
BlockingPromiseManager.add(promise);

//multiple
BlockingPromiseManager.add([promiseA, promiseB, promiseC]);
```

Execute code when all promises have completed.

```javascript
BlockingPromiseManager.then(function () {
    alert('All blocking promises complete.');
});
```

## Advanced Usage

Add promise to a group.

```javascript
BlockingPromiseManager.add(promise, 'myPromiseGroup');
```

Count the promises in a group.

```javascript
BlockingPromiseManager.count('myPromiseGroup');
```

Execute code when all promises in a group have completed.

```javascript
BlockingPromiseManager.then(function () {
    alert('All blocking promises complete.');
}, 'myPromiseGroup');
```