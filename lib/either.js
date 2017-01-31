// @flow

import {compose, id} from "./function.js";

export type Either<A, B> = <C> (A => C, B => C) => C;

export function left<A, B>(a: A): Either<A, B> {
    return function<C>(l: A => C, b: B => C): C {
        return l(a);
    };
}

export function right<A, B>(b: B): Either<A, B> {
    return function<C>(l: A => C, r: B => C): C {
        return r(b);
    };
}

export function isLeft<A, B>(e: Either<A, B>): bool {
    return e((a: A): bool => true, (b: B): bool => false);
}

export function isRight<A, B>(e: Either<A, B>): bool {
    return !isLeft(e);
}

export function bimap<A, B, C, D>(e: Either<A, B>, f: A => C, g: B => D): Either<C, D> {
    return e(compose(left, f), compose(right, g));
}

// Copy/paste code

export function map<A, B, C>(e: Either<A, B>, f: B => C): Either<A, C> {
    return bimap(e, id, f);
}
