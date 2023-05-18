import { configureStore } from '@reduxjs/toolkit'
import imagesReducer from './reducers/ImagesReducer';

export const store = configureStore({
  reducer: {
    image: imagesReducer
  },
});