// @flow

import type {Tuple} from "./tuple.js";
import type {Maybe} from "./maybe.js";
import {chain} from "./maybe.js";
import {tuple, fst, snd} from "./tuple.js";

export type Prism<A, B> = Tuple<A => Maybe<B>, B => A>;

export function preview<A, B>(p: Prism<A, B>, a: A): Maybe<B> {
    return fst(p)(a);
}

export function review<A, B>(p: Prism<A, B>, b: B): A {
    return snd(p)(b);
}

export function modify<A, B>(p: Prism<A, B>, a: A, f: B => B): A {
    return preview(p, a)(a, (b: B): A => review(p, f(b)));
}

export function composePrism<A, B, C>(pb: Prism<B, C>, pa: Prism<A, B>): Prism<A, C> {
    return tuple(
        (a: A): Maybe<C> => chain(preview(pa, a), (b: B): Maybe<C> => preview(pb, b)),
        (c: C): A => review(pa, review(pb, c))
    );
}
