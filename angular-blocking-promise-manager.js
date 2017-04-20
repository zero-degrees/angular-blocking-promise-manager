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
			var promises = {};

			/**
			 * Clean up the promise list, and fire the meta promise if they are all complete.
			 * 
			 * @return {void}
			 */
			function cleanPromiseList() {
				Object.keys(promises).forEach(function (groupName) {
					promises[groupName] = promises[groupName].filter(function (promise) {
						return promise.$$state.status != 1;
					});
				});

				Object.keys(promises).forEach(function (groupName) {
					if(promises[groupName].length === 0) {
						delete promises[groupName];
					}
				});

				//resolve and refresh the meta promise
				if(Object.keys(promises).length === 0) {
					metaPromise.resolve();
					metaPromise = $q.defer();
				}
			}

			return {
				/**
				 * Count the number of promises left in the queue. Optionally limited to the specified group.
				 *
				 * @param {string} [groupName] The name of the group you want to count
				 * 
				 * @return {Number}
				 */
				count: function (groupName) {
					if(groupName) {
						return typeof promises[groupName] == 'undefined' ? 0 : promises[groupName].length;
					}
					else {
						return Object.keys(promises).reduce(function (accumulator, groupName) {
							return accumulator + promises[groupName].length;
						}, 0);
					}
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
				 * Add one or more promises to the queue.
				 * 
				 * @param {object|object[]} newPromise The promise(s) you want to monitor
				 * @param {string} [groupName] The name of the group you want to add to (default: "_default")
				 * 
				 * @return {void}
				 */
				add: function (newPromise, groupName) {
					var newPromises = Array.isArray(newPromise) ? newPromise : [newPromise];

					groupName = groupName ? groupName : '_default';
					promises[groupName] = typeof promises[groupName] == 'undefined' ? [] : promises[groupName];

					newPromises.map(function (promise) {
						promise.then(
							function () {
								cleanPromiseList();
							},
							function () {
								cleanPromiseList();
							}
						);

						promises[groupName].push(promise);
					});
				}
			};
		}
	]);
}());