import { create } from 'zustand';
interface HomeStore {
    selectedCategoryId?: number;
    setSelectedCategoryId: (id?: number) => void;
}

export const homeStore = create<HomeStore>((set => ({
    setSelectedCategoryId: (id?: number) => set(() => ({ selectedCategoryId: id })),
    selectedCategoryId: undefined,
})))
