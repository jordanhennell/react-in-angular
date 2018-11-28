import angular = require("angular");

export const AngularModule = angular.module('reactInAngular', []);

angular.element(document).ready(() => {
    if (!angular.element(document).injector())
        angular.bootstrap(document, [AngularModule.name]);
});
