import { combineReducers, configureStore } from "@reduxjs/toolkit"
import dataReducer from "./Slices/DataSlice"


export default configureStore({
    reducer: combineReducers({
        ourData: dataReducer
    })
})