// @flow

import type {Monoid} from "./monoid.js";
import {monoid} from "./monoid.js";
import {id} from "./function.js";

export type List<A> = <B> (f: (A, B) => B, B) => B;

export const nil: List<*> = function<B>(f: (*, B) => B, b: B): B {
    return b;
};

export function cons<A>(a: A, l: List<A>): List<A> {
    return function<B>(f: (A, B) => B, b: B): B {
        return f(a, l(f, b));
    };
}

export function isNil<A>(l: List<A>): bool {
    return l((a: A, b: bool): boolean => false, true);
}

export function isCons<A>(l: List<A>): bool {
    return !isNil(l);
}

export function singleton<A>(a: A): List<A> {
    return cons(a, nil);
}

export function foldLeft<A, B>(l: List<A>, f: (B, A) => B, b: B): B {
    return l((a: A, c: B => B): (B => B) => (d: B): B => c(f(d, a)), id)(b);
}

export function reverse<A>(l: List<A>): List<A> {
    return foldLeft(l, (a: List<A>, b: A): List<A> => cons(b, a), nil);
}

export function fromArray<A>(a: Array<A>): List<A> {
    return a.reduceRight((a: List<A>, b: A): List<A> => cons(b, a), nil);
}

export function map<A, B>(l: List<A>, f: A => B): List<B> {
    return l((a: A, b: List<B>): List<B> => cons(f(a), b), nil);
}

export function listSemigroup<A>(a: List<A>, b: List<A>): List<A> {
    return a(cons, b);
}

export const listMonoid: Monoid<List<*>> = monoid(nil, listSemigroup);
