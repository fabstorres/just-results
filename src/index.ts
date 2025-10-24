export type Result<T, E = unknown> =
  | { success: true; data: T }
  | { success: false; error: E };

export const Result = {
  ok<T, E = unknown>(data: T): Result<T, E> {
    return { success: true, data };
  },

  fail<T = never, E = unknown>(error: E): Result<T, E> {
    return { success: false, error };
  },

  try<F extends (...args: any[]) => any, E = unknown>(
    fn: F,
    ...args: Parameters<F>
  ): Result<ReturnType<F>, E> {
    try {
      const value = fn(...args);
      return Result.ok<ReturnType<F>, E>(value);
    } catch (error) {
      return Result.fail<ReturnType<F>, E>(error as E);
    }
  },

  async tryAsync<F extends (...args: any[]) => Promise<any>, E = unknown>(
    fn: F,
    ...args: Parameters<F>
  ): Promise<Result<Awaited<ReturnType<F>>, E>> {
    try {
      const value = await fn(...args);
      return Result.ok<Awaited<ReturnType<F>>, E>(value);
    } catch (error) {
      return Result.fail<Awaited<ReturnType<F>>, E>(error as E);
    }
  },
};
