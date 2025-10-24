export type Result<T, E = string> =
  | { success: true; data: T }
  | { success: false; error: E };

export const Result = {
  ok<T, E = string>(data: T): Result<T, E> {
    return { success: true, data };
  },

  fail<T = never, E = string>(error: E): Result<T, E> {
    return { success: false, error };
  },

  try<F extends (...args: any[]) => any, E = string>(
    fn: F,
    ...args: Parameters<F>
  ): Result<ReturnType<F>, E> {
    try {
      const value = fn(...args);
      return Result.ok<ReturnType<F>, E>(value);
    } catch (error) {
      const message =
        error instanceof Error
          ? (error.message as unknown as E)
          : (String(error ?? "Unknown error") as unknown as E);
      return Result.fail<ReturnType<F>, E>(message);
    }
  },

  async tryAsync<F extends (...args: any[]) => Promise<any>, E = string>(
    fn: F,
    ...args: Parameters<F>
  ): Promise<Result<Awaited<ReturnType<F>>, E>> {
    try {
      const value = await fn(...args);
      return Result.ok<Awaited<ReturnType<F>>, E>(value);
    } catch (error) {
      const message =
        error instanceof Error
          ? (error.message as unknown as E)
          : (String(error ?? "Unknown error") as unknown as E);
      return Result.fail<Awaited<ReturnType<F>>, E>(message);
    }
  },
};
