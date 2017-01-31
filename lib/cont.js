// @flow

import type {Unit} from "./unit.js";
import {unit} from "./unit.js";
import {compose} from "./function.js";

export type Cont<A, B> = (B => A) => A;

export function go<A>(c: Cont<Unit, A>): Unit {
    return c((a: A): Unit => unit);
}

export function of<A, B>(b: B): Cont<A, B> {
    return (f: B => A): A => f(b);
}

export function chain<A, B, C>(a: Cont<A, B>, f: B => Cont<A, C>): Cont<A, C> {
    return (g: C => A): A => a((b: B): A => f(b)(g));
}

// Copy/paste

export function map<A, B, C>(a: Cont<A, B>, f: B => C): Cont<A, C> {
    return chain(a, compose(of, f));
}
