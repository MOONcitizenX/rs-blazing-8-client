import { State } from '../stateTypes';

export const setLS = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLS = (key: string): State | null => {
  const value = localStorage.getItem(key);
  try {
    if (value) {
      return JSON.parse(value);
    }
  } catch (err) {
    localStorage.removeItem(key);
    return null;
  }
  return null;
};

export const removeLS = (key: string) => {
  localStorage.removeItem(key);
};
