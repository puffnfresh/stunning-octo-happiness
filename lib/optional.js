// @flow

import type {Tuple} from "./tuple.js";
import type {Maybe} from "./maybe.js";
import {fst, snd} from "./tuple.js";

export type Optional<A, B> = Tuple<A => Maybe<B>, (B, A) => A>;

export function preview<A, B>(o: Optional<A, B>, a: A): Maybe<B> {
    return fst(o)(a);
}

export function set<A, B>(o: Optional<A, B>, a: A, b: B): A {
    return snd(o)(b, a);
}

export function modify<A, B>(o: Optional<A, B>, a: A, f: B => B): A {
    return preview(o, a)(a, (b: B): A => set(o, a, f(b)));
}
