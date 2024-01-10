import { combineReducers } from 'redux'
import productsReducer from './productsReducer'
import purchasesReducer from './purchasesReducer'
import customersReducer from './customersReducer'

export default combineReducers({
   productsReducer,
   purchasesReducer,
   customersReducer
})