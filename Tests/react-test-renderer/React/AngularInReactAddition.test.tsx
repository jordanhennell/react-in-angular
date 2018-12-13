import { create } from "react-test-renderer";
import { AddTwoNumbersReact } from "../../../App/src/React/AngularInReactAddition";
import React = require("react");

jest.mock('../../../App/src/React/AngularWrapper');

describe(AddTwoNumbersReact.name, () => {
    let sut = create(<AddTwoNumbersReact />).root;

    it("has correct default state", () => {
        let { first, second } = sut.instance.state;
        expect(first).toBe(2);
        expect(second).toBe(2);
    });

    describe("changing inputs", () => {
        let inputs = sut.findAllByType("input");
        let firstInput = inputs[0];
        let secondInput = inputs[1];

        test("changing input value changes state", () => {
            firstInput.props.onChange({ target: { value: "111" } });
            expect(sut.instance.state.first).toBe(111);
            
            secondInput.props.onChange({ target: { value: "222" } });
            expect(sut.instance.state.second).toBe(222);
        });
    });
});
