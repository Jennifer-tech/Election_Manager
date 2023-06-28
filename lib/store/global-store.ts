import { create } from "zustand";
import {
  createJSONStorage,
  devtools,
  persist,
  subscribeWithSelector,
} from "zustand/middleware";

type Store = {
  store: {
    isAuthenticated?: boolean;
  };
};

type Actions = {
  setStore: () => void;
  clearStore: () => void;
};

const GLOBAL_STORE = "election-manager-global-store";

const useGlobalStore = create<
  Store & Actions,
  [
    ["zustand/subscribeWithSelector", Store & Actions],
    ["zustand/devtools", Store & Actions],
    // ["zustand/persist", Store & Actions]
  ]
>(
  subscribeWithSelector(
    devtools(
        (set, get) => ({
          store: {
            isAuthenticated: false,
          },
          setStore: () => set((prev) => ({ store: {} }), false, "setStore"),
          clearStore: () => set({ store: {} }, false, "clearStore"),
        }),
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
