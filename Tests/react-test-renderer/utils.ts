import { Constructor } from "../../App/src/utils";

type MockedObject<T> = { [P in keyof T]: jest.Mock<{}> };

export function jestMockObject<T extends Object>(type: Constructor<T>, methodOverrides?: { [P in keyof Partial<T>]: T[P]}) {
    let mock = jest.fn<T>(() => {
        let instantiatedType = new type();
        
        let methods = Object.getOwnPropertyNames(Object.getPrototypeOf(instantiatedType));
        let props = Object.keys(instantiatedType);

        return [...methods, ...props].reduce((prev, curr) => {
            let value = methodOverrides && (methodOverrides as unknown as any)[curr]
            return { ...prev, [curr]: value ? jest.fn().mockImplementation(value) : jest.fn() };
        }, {} as MockedObject<T>);
    });
    return new mock();
}
