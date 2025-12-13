import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { UserInterface } from '@/shared/types/domain';

export const userAtom = atomWithStorage<UserInterface | null>('user', null);
export const isAuthAtom = atom(false);
export const authInitializedAtom = atom(false);
