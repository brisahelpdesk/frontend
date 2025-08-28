import { create } from "zustand";

export interface FilterProduct {
  geral?: string;
  categoryId?: string;
  type?: string;
  isActive?: string;
  isPhysical?: string;
}

export interface FilterProductActions {
  resetFilter: () => void;
  setFilterGeral: (value: string) => void;
  setFilterCategoryId: (value: string) => void;
  setFilterType: (value: string) => void;
  setFilterIsActive: (value: string) => void;
  setFilterIsPhysical: (value: string) => void;
}

const initialFilter: Readonly<FilterProduct> = {
  geral: undefined,
  categoryId: undefined,
  type: undefined,
  isActive: undefined,
  isPhysical: undefined,
};

interface FilterProductStore {
  filter: FilterProduct;
  actions: FilterProductActions;
}

const ifAll = (value: string) => value === "all" ? undefined : value;

const useFilterProductStore = create<FilterProductStore>((set) => ({
  filter: initialFilter,
  actions: {
    resetFilter: () => set({ filter: initialFilter }),

    setFilterGeral: (value) => {
      return set((state) => ({
        filter: { ...state.filter, geral: value },
      }));
    },

    setFilterCategoryId: (value) => {
      return set((state) => ({
        filter: { ...state.filter, categoryId: ifAll(value) },
      }));
    },

    setFilterType: (value) => {
      return set((state) => ({
        filter: { ...state.filter, type: ifAll(value) },
      }));
    },

    setFilterIsActive: (value) => {
      return set((state) => ({
        filter: { ...state.filter, isActive: ifAll(value) },
      }));
    },

    setFilterIsPhysical: (value) => {
      return set((state) => ({
        filter: { ...state.filter, isPhysical: ifAll(value) },
      }));
    },
  }
}));

export function useProductFilters() {
  return useFilterProductStore((state) => state.filter);
}

export function useProductFilterActions() {
  return useFilterProductStore((state) => state.actions );
}
