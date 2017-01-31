// @flow

import {id} from "./function.js";
import type {List} from "./list.js";
import {cons, nil} from "./list.js";

export type Tuple<A, B> = <C> (f: (A, B) => C) => C;

export function tuple<A, B>(a: A, b: B): Tuple<A, B> {
    return function<C>(f: (A, B) => C): C {
        return f(a, b);
    }
}

export function fst<A, B>(t: Tuple<A, B>): A {
    return t(function(a: A, b: B): A {
        return a;
    });
}

export function snd<A, B>(t: Tuple<A, B>): B {
    return t(function(a: A, b: B): B {
        return b;
    });
}

export function swap<A, B>(t: Tuple<A, B>): Tuple<B, A> {
    return t(function(a: A, b: B): Tuple<B, A> {
        return tuple(b, a);
    });
}

export function toList<A, B>(t: Tuple<A, B>): List<B> {
    return t(function(a: A, b: B): List<B> {
        return cons(b, nil());
    });
}

export function bimap<A, B, C, D>(t: Tuple<A, B>, f: A => C, g: B => D): Tuple<C, D> {
    return t(function(a: A, b: B): Tuple<C, D> {
        return tuple(f(a), g(b));
    });
}

// Copy/paste code

export function map<A, B, C>(t: Tuple<A, B>, f: B => C): Tuple<A, C> {
    return bimap(t, id, f);
}
