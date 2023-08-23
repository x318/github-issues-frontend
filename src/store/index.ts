import { configureStore } from '@reduxjs/toolkit';
import issuesApi from '@/services/issues';
import statsApi from '@/services/stats';
import rtkQueryErrorLogger from './errorMiddleware';

import issuesSlice from './issuesSlice';

export const store = configureStore({
  reducer: {
    issues: issuesSlice,
    [issuesApi.reducerPath]: issuesApi.reducer,
    [statsApi.reducerPath]: statsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rtkQueryErrorLogger, issuesApi.middleware, statsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
