// @flow

export type Empty = <A> () => A;

export function absurd<A>(e: Empty): A {
    return e();
}
