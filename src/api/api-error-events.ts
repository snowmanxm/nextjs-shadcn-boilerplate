const ApiErrorEventName = 'api:error';

type ApiErrorEventDetail = { error: unknown };

class ApiErrorEvents {
  protected readonly target: EventTarget | null =
    typeof window !== 'undefined' ? new EventTarget() : null;

  emit(error: unknown): void {
    this.target?.dispatchEvent(
      new CustomEvent<ApiErrorEventDetail>(ApiErrorEventName, { detail: { error } }),
    );
  }

  onError(handler: (error: unknown) => void): () => void {
    if (!this.target) {
      return () => {};
    }

    const listener = (event: Event) => {
      handler((event as CustomEvent<ApiErrorEventDetail>).detail.error);
    };
    this.target.addEventListener(ApiErrorEventName, listener);

    return () => this.target?.removeEventListener(ApiErrorEventName, listener);
  }
}

export const apiErrorEvents = new ApiErrorEvents();
