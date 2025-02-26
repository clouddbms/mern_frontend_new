import {configureStore} from '@reduxjs/toolkit'
import articleSlice from './article-slice'
import userSlice from './user-slice';
const store=configureStore({
    reducer:{
        articles:articleSlice.reducer,
        users:userSlice.reducer
    }
})
export default store;