import { module } from "angular";
import "ngreact";
import "mobx-angularjs";
import React = require("react");

export const AngularModule = module('reactInAngular', ['react', 'mobx-angularjs']);

export interface IContextProps {
    $injector: ng.auto.IInjectorService;
}

export let GlobalContext: React.Context<IContextProps>;

AngularModule.run(($injector: ng.auto.IInjectorService) => {
    GlobalContext = React.createContext({ $injector });
});
