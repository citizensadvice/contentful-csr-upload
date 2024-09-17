import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const suppliersSlice = createSlice({
  name: "suppliers",
  initialState,
  reducers: {
    addSupplier: (state, action) => {
      state.value = [...state.value, action.payload];
    },
    resetSuppliers: (state, action) => {
      state.value = [];
    },
    setSupplier: (state, action) => {
      const { supplierId, status, newContentfulId } = action.payload;

      const supplier = state.value.find((s) => s.id === supplierId);
      supplier.status = status;
      supplier.newContentfulId = newContentfulId;
    },
    setSupplierStatus: (state, action) => {
      const { id, status } = action.payload;

      const supplier = state.value.find((s) => s.id === id);
      supplier.status = status;
    },
    setWhitelabelSupplierId: (state, action) => {
      const { id, whitelabelSupplierContentfulId } = action.payload;

      const supplier = state.value.find((s) => s.id === id);
      supplier.whitelabelSupplierContentfulId = whitelabelSupplierContentfulId;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addSupplier,
  resetSuppliers,
  setSupplier,
  setSupplierStatus,
  setWhitelabelSupplierId,
} = suppliersSlice.actions;

export default suppliersSlice.reducer;
