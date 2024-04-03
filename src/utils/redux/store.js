import { configureStore } from "@reduxjs/toolkit";
import otherSlice from "./otherSlice";
import userSlice from "./userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    other: otherSlice,
  },
});
