import { create } from "zustand";

const usePlinkoStore = create((set) => ({
  currentBinIndex: null,
  setCurrentBinIndex: (index) => set({ currentBinIndex: index }),
}));

// const useStore = create((set, get) => ({
//   lang: 'javascript',
//   setLang: (lang) => set(() => ({ lang })),
//   getCode: () =>
//     get().lang === 'javascript' ? javascriptCode : typescriptCode,
// }))

export default usePlinkoStore;