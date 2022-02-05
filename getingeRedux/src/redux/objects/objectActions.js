import axios from 'axios';
import {
  FETCH_OBJECTS_REQUEST,
  FETCH_OBJECTS_FAILURE,
  FETCH_OBJECTS_SUCCESS
} from './objectTypes'

export const fetchObjects = (bucketid) => {
  return (dispatch) => {
      dispatch(fetchObjectsRequest())
      axios.get(`https://challenge.3fs.si/storage/buckets/`+bucketid+`/objects`,{
        headers: {
          'Authorization': 'Token d87349cf-6e51-40da-b659-8a531469dfdb'
        }
      })
        .then(response => {
            const Objects = response.data
            dispatch(fetchObjectsSuccess(Objects))
        })
        .catch(error => {
            dispatch(fetchObjectsFailure(error.message))
        })
     }
}

export const fetchObjectsRequest = () => {
  return {
    type: FETCH_OBJECTS_REQUEST
  }
}

export const fetchObjectsSuccess = Objects => {
  return {
    type: FETCH_OBJECTS_SUCCESS,
    payload: Objects
  }
}

export const fetchObjectsFailure = error => {
  return {
    type: FETCH_OBJECTS_FAILURE,
    payload: error
  }
}
