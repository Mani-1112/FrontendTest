import { combineReducers } from 'redux'
import objectReducer from './objects/objectReducer'
import bucketReducer from './buckets/bucketReducer'

const rootReducer = combineReducers({
  object: objectReducer,
  bucket: bucketReducer,
})

export default rootReducer