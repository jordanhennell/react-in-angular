import { create } from "react-test-renderer";
import { SimpleReact } from "../../../App/src/React/SimpleReact";
import React = require("react");

describe(SimpleReact.name, () => {
    let testRenderer = create(<SimpleReact />);

    it("has correct default message", () => {
        let message = testRenderer.root.props.message; // This has no typing!! 👎
        expect(message).toBe("Hello from React (default)")
    });

    test("setting custom message", () => {
        testRenderer.update(<SimpleReact message="foo" />);
        expect(testRenderer.root.props.message).toBe("foo");
    });
});
