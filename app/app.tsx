import { bootstrap, module } from "angular";
import "ngreact";
import * as ReactDOM from 'react-dom';
import React = require("react");

export const AngularModule = module('reactInAngular', ['react']);

const rootEl = document.getElementById("root")!;

ReactDOM.render(<>
    <div dangerouslySetInnerHTML={{ __html: rootEl.innerHTML }} />
    <h4>Outside Angular</h4>
    <div>Hello from React from outside Angular</div>
</>, rootEl, () => setTimeout(() => bootstrap(rootEl, ['reactInAngular']), 0));
