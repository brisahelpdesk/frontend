import { create } from "zustand";

export interface FilterState {
  search?: string;
  status?: string;
  departmentId?: string;
}

export interface FilterActions {
  resetFilter: () => void;
  setSearch: (value: string) => void;
  setStatus: (value: string) => void;
  setDepartmentId: (value: string) => void;
}

export interface FilterUserStore {
  filter: FilterState;
  actions: FilterActions;
}

const initialFilter: Readonly<FilterState> = {
  search: undefined,
  status: undefined,
  departmentId: undefined,
};

const filterUserStore = create<FilterUserStore>((set) => ({
  filter: initialFilter,

  actions: {
    resetFilter: () => {
      return set({
        filter: { ...initialFilter },
      });
    },

    setSearch: (value) => {
      return set((state) => ({
        filter: { ...state.filter, search: value === "all" ? undefined : value },
      }));
    },

    setStatus: (value) => {
      return set((state) => ({
        filter: { ...state.filter, status: value === "all" ? undefined : value },
      }));
    },

    setDepartmentId: (value) => {
      return set((state) => ({
        filter: { ...state.filter, departmentId: value === "all" ? undefined : value },
      }));
    },
  },
}));

export function useFiltersUser() {
  return filterUserStore((state) => state.filter);
}

export function useFilterUserActions() {
  return filterUserStore((state) => state.actions);
}
