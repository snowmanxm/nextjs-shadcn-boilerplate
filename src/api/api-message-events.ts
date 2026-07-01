const ApiMessageEventName = 'api:message';

type ApiMessageEventDetail = { message: string };

class ApiMessageEvents {
  protected readonly target: EventTarget | null =
    typeof window !== 'undefined' ? new EventTarget() : null;

  emit(message: string): void {
    this.target?.dispatchEvent(
      new CustomEvent<ApiMessageEventDetail>(ApiMessageEventName, { detail: { message } }),
    );
  }

  onMessage(handler: (message: string) => void): () => void {
    if (!this.target) {
      return () => {};
    }

    const listener = (event: Event) => {
      handler((event as CustomEvent<ApiMessageEventDetail>).detail.message);
    };
    this.target.addEventListener(ApiMessageEventName, listener);

    return () => this.target?.removeEventListener(ApiMessageEventName, listener);
  }
}

export const apiMessageEvents = new ApiMessageEvents();
