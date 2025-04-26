import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./slices/authSlice";
import gamesReducer from "./slices/gameSlice";

const gamesPersistConfig = {
  key: "games",
  storage,
  whitelist: ["games"],
};

const persistedGamesReducer = persistReducer(gamesPersistConfig, gamesReducer);

const store = configureStore({
  reducer: {
    auth: authReducer,
    games: persistedGamesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
