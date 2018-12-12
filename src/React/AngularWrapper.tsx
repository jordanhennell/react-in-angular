import { observer } from "mobx-react";
import { GlobalContext } from "../app";
import React = require("react");

@observer
export class AngularWrapper extends React.Component<{ children: string }> {
    render() {
        return <GlobalContext.Consumer>
            {context => <AngularWrapperInner
                html={this.props.children}
                $injector={context.$injector} />}
        </GlobalContext.Consumer>
    }
}

interface IAngularWrapperInnerProps {
    html: string,
    $injector: ng.auto.IInjectorService
}

@observer
class AngularWrapperInner extends React.Component<IAngularWrapperInnerProps> {
    private rootElement: Element | null = null;
    private scope: ng.IScope | undefined;

    constructor(props: IAngularWrapperInnerProps) {
        super(props);
    }

    componentDidMount() {
        this.compileAngular();
    }

    componentDidUpdate() {
        this.compileAngular();
        this.scope!.$apply();
    }

    render() {
        return <div ref={e => this.rootElement = e} dangerouslySetInnerHTML={{ __html: this.props.html }} />
    }

    private compileAngular() {
        this.resetScope();
        this.$compile(this.rootElement!)(this.scope!);
    }

    private resetScope() {
        this.scope && this.scope!.$destroy();
        this.scope = this.$rootScope.$new();
    }

    private get $compile() { return this.$injector.get("$compile"); }
    private get $rootScope() { return this.$injector.get("$rootScope"); }
    private get $injector() { return this.props.$injector; }
}
