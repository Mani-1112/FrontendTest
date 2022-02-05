import {
  FETCH_BUCKETS_REQUEST,
  FETCH_BUCKETS_FAILURE,
  FETCH_BUCKETS_SUCCESS
} from './bucketTypes'

const initialState = {
    loading: false,
    data: [],
    error: ''
}

const bucketReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BUCKETS_REQUEST: 
        return {
            ...state,
            loading: true,
        }
    case FETCH_BUCKETS_SUCCESS: 
        return {
            ...state,
            data: action.payload,
            loading: false
        }
    case FETCH_BUCKETS_FAILURE:
        return {
            ...state,
            loading: false,
            error: action.payload
        }
    
    default: return state;
  } 
}

export default bucketReducer