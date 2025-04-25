/**
 * @internal
 */
export type CallbackQueue<T> = Array<(value: T) => void>

/**
 * @internal
 */
export type CallbackSet<T> = Set<(value: T) => void>
