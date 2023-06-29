import { AuthResponse } from "@/utils/endpoints/types/auth.type";
import { Solitreo } from "next/font/google";
import { create } from "zustand";
import {
  createJSONStorage,
  devtools,
  persist,
  subscribeWithSelector,
} from "zustand/middleware";

interface State {
  store: {
    isAuthenticated?: boolean;
  } & Partial<AuthResponse>
}

type Actions = {
  setStore: (state: State) => void;
  clearStore: () => void;
};

const GLOBAL_STORE = "election-manager-global-store";

const useGlobalStore = create<
  State & Actions,
  [
    ["zustand/subscribeWithSelector", State & Actions],
    ["zustand/devtools", State & Actions]
    // ["zustand/persist", Store & Actions]
  ]
>(
  subscribeWithSelector(
    devtools(
      (set, get) => ({
        store: {
          isAuthenticated: false,
        },
        setStore: (state) => set((prev) => ({ store: state.store}), false, "setStore"),
        clearStore: () => set({ store: {} }, false, "clearStore"),
      })
      //   persist(
      //     {
      //       name: GLOBAL_STORE,
      //       storage: createJSONStorage(() => localStorage),
      //     }
      //   )
    )
  )
);

export default useGlobalStore;
