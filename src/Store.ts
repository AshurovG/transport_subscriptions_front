import { combineReducers, configureStore } from "@reduxjs/toolkit"
import dataReducer from "./Slices/MainSlice"


export default configureStore({
    reducer: combineReducers({
        ourData: dataReducer
    })
})