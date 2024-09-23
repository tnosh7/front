import { create } from "zustand";

const useLoginUserStore = create((set) => ({
  loginUser: null,
  setLoginUser: (loginUser) => set((state) => ({ ...state, loginUser })),
  resetLoginUser: () => set((state) => ({ ...state, loginUser: null })),
}));

export default useLoginUserStore;