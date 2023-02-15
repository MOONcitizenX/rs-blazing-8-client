import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ChatStoreTypes } from './types/interfaces/ChatStoreTypes';

export const useChatState = create(
  devtools<ChatStoreTypes>(() => ({
    messages: [],
  })),
);
