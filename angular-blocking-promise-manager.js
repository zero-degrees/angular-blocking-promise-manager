/**
 * Angular Blocking Promise Manager
 * https://github.com/zero-degrees/angularjs-blocking-promise-manager
 *
 * @copyright 2017 Craig Russell
 * @license MIT
 */

(function() {
	'use strict';

	angular.module('BlockingPromiseManager', []).factory('BlockingPromiseManager', [
		'$q',
		function ($q) {
			var metaPromise = $q.defer();
			var promises = [];

			/**
			 * Clean up the promise list, and fire the meta promise if they are all complete.
			 * 
			 * @return {void}
			 */
			function cleanPromiseList() {
				promises = promises.filter(function (promise) {
					return promise.$$state.status != 1;
				});

				//resolve and refresh the meta promise
				if(promises.length === 0) {
					metaPromise.resolve();
					metaPromise = $q.defer();
				}
			}

			return {
				/**
				 * Count the number of promises left in the queue.
				 * 
				 * @return {Number}
				 */
				count: function () {
					return promises.length;
				},

				/**
				 * Get this service's meta promise, which completes when all of the promises it tracks have succeeded
				 * or failed.
				 * 
				 * @return {object} The meta promise
				 */
				getMetaPromise: function () {
					return metaPromise;
				},

				/**
				 * Add a promise to the queue.
				 * 
				 * @param {object} promise The promise you want to monitor
				 */
				add: function (promise) {
					promise.then(
						function () {
							cleanPromiseList();
						},
						function () {
							cleanPromiseList();
						}
					);

					promises.push(promise);
				}
			};
		}
	]);
}());