// @flow

export function compose<A, B, C>(f: B => C, g: A => B): A => C {
    return function(a: A): C {
        return f(g(a));
    };
}

export function id<A>(a: A): A {
    return a;
}
