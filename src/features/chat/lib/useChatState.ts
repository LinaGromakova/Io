import { useAtomValue, useSetAtom } from 'jotai';
import { isBlockAtom, setIsBlockAtom } from '../model/atoms';

export const useChatState = () => ({
  isBlock: useAtomValue(isBlockAtom),
});

export const useChatSetters = () => ({
  setIsBlock: useSetAtom(setIsBlockAtom),
});
