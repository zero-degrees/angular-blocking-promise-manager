/**
 * Angular Blocking Promise Manager
 * https://github.com/zero-degrees/angularjs-blocking-promise-manager
 *
 * Copyright (c) 2017 Craig Russell
 * Released under the MIT license
 * https://github.com/zero-degrees/angularjs-blocking-promise-manager/blob/master/LICENSE
 */

(function() {
	'use strict';

	angular.module('BlockingPromiseManager').factory('BlockingPromiseManager', [
		'$q',
		function ($q) {
			var metaPromise = $q.defer();
			var promises = [];

			function cleanPromiseList() {
				var originalPromises = promises,
					cleanedPromises = [],
					i;

				for(i = 0; i < originalPromises.lengthl; ++i) {
					if(originalPromises[i].$$state.status != 1) {
						cleanedPromises.push(originalPromises[i]);
					}
				}

				//resolve and refresh the meta promise when everything is complete
				if(promises.length === 0) {
					metaPromise.resolve();
					metaPromise = $q.defer();
				}

				promises = cleanedPromises;
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