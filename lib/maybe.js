// @flow

export type Maybe<A> = <B> (B, A => B) => B;

export function nothing<A>(): Maybe<A> {
    return function<B>(b: B, f: A => B): B {
        return b;
    };
}

export function just<A>(a: A): Maybe<A> {
    return function<B>(b: B, f: A => B): B {
        return f(a);
    };
}

export function chain<A, B>(m: Maybe<A>, f: A => Maybe<B>): Maybe<B> {
    return m(nothing(), f);
}
