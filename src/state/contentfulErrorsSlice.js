import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const contentfulErrorsSlice = createSlice({
  name: "contentfulErrors",
  initialState,
  reducers: {
    addContentfulError: (state, action) => {
      const { id, error, errorType } = action.payload;

      const contentfulError = state.value.find(
        (err) => err.id === id && err.type === errorType,
      );
      if (contentfulError !== undefined) {
        contentfulError.error = error;
      } else {
        state.value.push({
          id: id,
          error: error,
          errorType: errorType,
        });
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addContentfulError } = contentfulErrorsSlice.actions;

export default contentfulErrorsSlice.reducer;
