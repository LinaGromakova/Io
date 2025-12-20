export class RequestGuard {
  private static instance: RequestGuard;
  private pendingRequests: Map<string, Promise<unknown>> = new Map();
  static getInstance(): RequestGuard {
    if (!RequestGuard.instance) {
      RequestGuard.instance = new RequestGuard();
    }
    return RequestGuard.instance;
  }
  async execute<T>(key: string, fn: () => Promise<T>): Promise<T> {
    const existing = this.pendingRequests.get(key);
    if (existing) {
      return existing as Promise<T>;
    }
    const promise = fn()
      .then((result) => {
        return result;
      })
      .catch((error) => {
        throw error;
      })
      .finally(() => {
        this.pendingRequests.delete(key);
      });

    this.pendingRequests.set(key, promise);
    return promise;
  }
}
