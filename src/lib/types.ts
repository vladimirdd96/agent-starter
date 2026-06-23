/** Make specific keys of T required (rest stay as-is) */
export type RequireFields<T, K extends keyof T> = T & Required<Pick<T, K>>

/** Make specific keys of T optional (rest stay as-is) */
export type PartialFields<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

/** Extract the resolved type from a Promise */
export type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T

/** Derive string union from a const object's values */
export type ValueOf<T extends Record<string, unknown>> = T[keyof T]

/** Nominal typing — brand a primitive to prevent mixing up same-shaped values */
export type Brand<T, B extends string> = T & { readonly __brand: B }

// Example nominal types — add yours:
// export type UserId = Brand<string, 'UserId'>
// export type Email = Brand<string, 'Email'>
