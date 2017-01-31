// @flow

import type {Tuple} from "./tuple.js";
import {tuple, fst, snd} from "./tuple.js";

export type Lens<A, B> = Tuple<A => B, (B, A) => A>;

export function get<A, B>(l: Lens<A, B>, a: A): B {
    return fst(l)(a);
}

export function set<A, B>(l: Lens<A, B>, a: A, b: B): A {
    return snd(l)(b, a);
}

export function modify<A, B>(l: Lens<A, B>, a: A, f: B => B): A {
    return set(l, a, f(get(l, a)));
}

export function composeLens<A, B, C>(lb: Lens<B, C>, la: Lens<A, B>): Lens<A, C> {
    return tuple(
        (a: A): C => get(lb, get(la, a)),
        (c: C, a: A): A => set(la, a, set(lb, get(la, a), c))
    );
}
