// @flow

import type {Monoid} from "./monoid.js";
import type {List} from "./list.js";
import {singleton, listMonoid} from "./list.js";
import {id} from "./function.js";

export type Fold<A, B> = <C> (B => C, Monoid<C>, A) => C

export function getAll<A, B>(f: Fold<A, B>, a: A): List<B> {
    return f(singleton, listMonoid, a);
}
