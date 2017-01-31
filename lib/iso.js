// @flow

import type {Tuple} from "./tuple.js";
import {tuple, swap} from "./tuple.js";

export type Iso<A, B> = Tuple<A => B, B => A>;

export function iso<A, B>(f: A => B, g: B => A): Iso<A, B> {
    return tuple(f, g);
}

export function from<A, B>(iso: Iso<A, B>): Iso<B, A> {
    return swap(iso);
}
