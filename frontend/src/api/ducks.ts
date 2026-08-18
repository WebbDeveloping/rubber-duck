import { api } from './client';
import type { CreateDuckInput, Duck, UpdateDuckInput } from '../types/duck';

export function listDucks() {
  return api<Duck[]>('/ducks');
}

export function getDuck(id: number) {
  return api<Duck>(`/ducks/${id}`);
}

export function createDuck(body: CreateDuckInput) {
  return api<Duck>('/ducks', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export function updateDuck(id: number, body: UpdateDuckInput) {
  return api<Duck>(`/ducks/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(body),
  });
}

export function deleteDuck(id: number) {
  return api<void>(`/ducks/${id}`, { method: 'DELETE' });
}
