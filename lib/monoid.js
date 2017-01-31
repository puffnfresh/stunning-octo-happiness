// @flow

import type {Semigroup} from "./semigroup.js";
import type {Tuple} from "./tuple.js";
import {tuple} from "./tuple.js";

export type Monoid<A> = Tuple<A, Semigroup<A>>;

export function monoid<A>(a: A, s: Semigroup<A>): Monoid<A> {
    return tuple(a, s);
}
