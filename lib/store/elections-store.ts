// import { AuthResponse } from "@/utils/endpoints/types/auth.type";
// import { Solitreo } from "next/font/google";
// import { create } from "zustand";
// import {
//   createJSONStorage,
//   devtools,
//   persist,
//   subscribeWithSelector,
// } from "zustand/middleware";

// export interface State {
//   store: {
//     isAuthenticated?: boolean;
//   } & Partial<AuthResponse>;
// }

// export type Actions = {
//   setStore: (state: State) => void;
//   clearStore: () => void;
// };

// export const GLOBAL_STORE = "election-manager-global-store";

// const useGlobalStore = create<
//   State & Actions,
//   [
//     ["zustand/subscribeWithSelector", State & Actions],
//     ["zustand/devtools", State & Actions]
//   ]
// >(
//   subscribeWithSelector(
//     devtools((set, get) => ({
//       elections: {
//         isAuthenticated: false,
//       },
//       setStore: (state) =>
//         set((prev) => ({ store: state.store }), false, "setStore"),
//       clearStore: () => set({ store: {} }, false, "clearStore"),
//     }))
//   )
// );

// export default useGlobalStore;

export {}