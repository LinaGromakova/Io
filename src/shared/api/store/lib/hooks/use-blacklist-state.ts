import { useAtomValue, useSetAtom } from 'jotai';
import { isBlackListOpenAtom, toggleBlackListAtom } from '../model/atoms/blacklist-atoms';

export const useBlackListState = () => ({
  isBlackListOpen: useAtomValue(isBlackListOpenAtom),
  toggleBlackList: useSetAtom(toggleBlackListAtom),
});

