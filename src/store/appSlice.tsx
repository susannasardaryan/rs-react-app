import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface AppState {
  isLoading: boolean;
  selectedItems: string[];
  pageNumber: number;
}

const initialState: AppState = {
  isLoading: false,
  selectedItems: [],
  pageNumber: 1,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setPageNumber(state, action: PayloadAction<number>){
        state.pageNumber = action.payload;
    },
    addItem: (state, action) => {
        state.selectedItems.push(action.payload);
      },
      removeItem: (state, action) => {
        state.selectedItems = state.selectedItems.filter(item => item !== action.payload);
      },
      unselectAllItems: (state)=>{
        state.selectedItems = [];
      }
  },
});

export const { setLoading,setPageNumber, addItem, removeItem, unselectAllItems } = appSlice.actions;
export default appSlice.reducer;