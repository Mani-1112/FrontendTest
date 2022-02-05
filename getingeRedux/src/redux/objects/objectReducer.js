import {
    FETCH_OBJECTS_REQUEST,
    FETCH_OBJECTS_FAILURE,
    FETCH_OBJECTS_SUCCESS
  } from './objectTypes'
  
  const initialState = {
      loading: false,
      data: [],
      error: ''
  }
  
  const ObjectReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_OBJECTS_REQUEST: 
          return {
              ...state,
              loading: true,
          }
      case FETCH_OBJECTS_SUCCESS: 
          return {
              ...state,
              data: action.payload,
              loading: false
          }
      case FETCH_OBJECTS_FAILURE:
          return {
              ...state,
              loading: false,
              error: action.payload
          }
      
      default: return state;
    } 
  }

export default ObjectReducer