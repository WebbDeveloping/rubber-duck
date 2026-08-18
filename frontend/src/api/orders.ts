import { api } from './client';
import type { CreateOrderInput, OrderQuote } from '../types/order';

export function createOrder(body: CreateOrderInput) {
  return api<OrderQuote>('/orders', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}
