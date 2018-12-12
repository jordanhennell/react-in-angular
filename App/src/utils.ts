export type Constructor<T> = new (...args: any[]) => T

export function angularFriendlyName<T>(ctor: Constructor<T>) {
    let name = ctor.name;
    return name.charAt(0).toLowerCase() + name.slice(1);
}

export function isConstructor<T>(injections: string | Constructor<T>): injections is Constructor<T> {
    return injections instanceof Function;
}
