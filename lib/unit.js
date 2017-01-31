// @flow

export type Unit = <A> (A) => A;

export const unit: Unit = <A> (a: A): A => a;
