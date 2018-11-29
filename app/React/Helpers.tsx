import { GlobalContext } from "../app";
import React = require("react");

export class InjectionHelper extends React.Component<{ children($injector: ng.auto.IInjectorService): React.ReactNode }> {
    render() {
        return <GlobalContext.Consumer>
            {context => this.props.children(context.$injector)}
        </GlobalContext.Consumer>
    }
}

export class AngularWrapper extends React.Component<{ children: string }> {
    render() {
        return <InjectionHelper>
            {$injector => <AngularWrapperInner html={this.props.children} $injector={$injector} />}
        </InjectionHelper>
    }
}

class AngularWrapperInner extends React.Component<{ html: string, $injector: ng.auto.IInjectorService }> {
    private angularRef: null | HTMLDivElement = null;

    componentDidMount() {
        this.updateAngularHtml();
    }

    render() {
        return <div ref={r => this.angularRef = r} />;
    }

    private updateAngularHtml() {
        var compile = this.$injector.get("$compile");
        var timeout = this.$injector.get("$timeout");

        var compiled = compile(this.props.html)(this.createIsolatedScope());

        timeout(() =>
            this.angularRef!.innerHTML = compiled.html(),
            0);
    }

    private createIsolatedScope() {
        return this.$injector.get("$rootScope").$new(true);
    }

    private get $injector() { return this.props.$injector; }
}