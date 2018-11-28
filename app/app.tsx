import { module } from "angular";
import "ngreact";
import * as ReactDOM from 'react-dom';
import React = require("react");

export let AngularModule = module('reactInAngular', ['react']);

let root = document.getElementById("root")!;

ReactDOM.render(<>
    <div dangerouslySetInnerHTML={ {  __html: root.innerHTML} } />
    <h3>Outside of Angular</h3>
    <div>Hello from React from outside Angular</div>
</>, root);
