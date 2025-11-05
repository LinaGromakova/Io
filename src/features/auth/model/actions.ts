import { atom } from "jotai";
import { isAuthAtom, userAtom } from "./atoms";
import { UserInterface } from "../types/UserInterface";

export const loginAtom = atom(null, (get, set, userData: UserInterface) => {
  set(userAtom, userData);
  set(isAuthAtom, true);
});

export const logoutAtom = atom(null, (get, set) => {
  set(userAtom, null);
  set(isAuthAtom, false);
});

export const updateUserAtom = atom(
  null,
  (get, set, userData: Partial<UserInterface>) => {
    const currentUser = get(userAtom);
    if (currentUser) {
      set(userAtom, { ...currentUser, ...userData });
    }
  }
);
