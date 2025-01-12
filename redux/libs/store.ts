import { configureStore, createReducer } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import CartSlice from '../cartSlice'

const persistConfig = {
  key: 'root',
  storage,
};

export const makeStore = () => {
  return configureStore({
    reducer: {
      cart:persistReducer(persistConfig,CartSlice),
    },
  })
}

const store = makeStore();
export const persistor = persistStore(store);

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

// import { combineReducers, configureStore } from '@reduxjs/toolkit'
// import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'

// import cartSlice from '../cartSlice'

// const persistConfig = {
//   key: 'persist',
//   storage,
// }

// const rootReducer = combineReducers({
//   cart: cartSlice,
// })

// const makeConfiguredStore = () =>
//   configureStore({
//     reducer: rootReducer,
//   })

// export const makeStore = () => {
//   const isServer = typeof window === 'undefined'
//   if (isServer) {
//     return makeConfiguredStore()
//   } else {
//     const persistedReducer = persistReducer(persistConfig, rootReducer)
//     let store: any = configureStore({
//       reducer: persistedReducer,
//     })
//     store.__persistor = persistStore(store)
//     return store
//   }
// }

// export type AppStore = ReturnType<typeof makeStore>
// export type RootState = ReturnType<AppStore['getState']>
// export type AppDispatch = AppStore['dispatch']