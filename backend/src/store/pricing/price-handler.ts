import type { PriceContext } from './pricing.types';

export abstract class PriceHandler {
  private next: PriceHandler | undefined;

  setNext(handler: PriceHandler): PriceHandler {
    this.next = handler;
    return handler;
  }

  handle(ctx: PriceContext): void {
    this.apply(ctx);
    this.next?.handle(ctx);
  }

  protected abstract apply(ctx: PriceContext): void;
}
