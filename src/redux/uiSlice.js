import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDeveloperModalOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setIsDeveloperModalOpen(state, action) {
      state.isDeveloperModalOpen = action.payload;
    },
  },
});

export const { setIsDeveloperModalOpen } = uiSlice.actions;
export default uiSlice.reducer;
