import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface IssuesState {
  search: string;
  page: number;
}

const initialState: IssuesState = {
  search: '',
  page: 1,
};

const issuesSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<IssuesState['search']>) => {
      state.search = action.payload;
    },
    setPage: (state, action: PayloadAction<IssuesState['page']>) => {
      state.page = action.payload;
    },
  },
});

export const { setSearch, setPage } = issuesSlice.actions;
export default issuesSlice.reducer;
