export type Constructor<T> = new (...args: any[]) => T

export function angularFriendlyName<T>(ctor: Constructor<T>) {
    let name = ctor.name;
    return name.charAt(0).toLowerCase() + name.slice(1);
}
