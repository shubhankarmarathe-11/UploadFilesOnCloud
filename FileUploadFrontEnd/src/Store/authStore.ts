import { create } from "zustand";

type LoggedInStore = {
  islogged: boolean;
  setLoggedIn: (value: boolean) => void;
};

export const useLoggedIn = create<LoggedInStore>((set) => ({
  islogged: false,
  setLoggedIn: (value) => set({ islogged: value }),
}));
