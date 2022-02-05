import axios from 'axios';
import {
  FETCH_BUCKETS_REQUEST,
  FETCH_BUCKETS_FAILURE,
  FETCH_BUCKETS_SUCCESS
} from './bucketTypes'

export const fetchBuckets = () => {
  return (dispatch) => {
      dispatch(fetchBucketRequest())
      axios.get('https://challenge.3fs.si/storage/buckets',{
        headers: {
          'Authorization': 'Token d87349cf-6e51-40da-b659-8a531469dfdb'
        }
      })
        .then(response => {
            const buckets = response.data
            dispatch(fetchBucketSuccess(buckets))
        })
        .catch(error => {
            dispatch(fetchBucketFailure(error.message))
        })
  }
}

export const fetchBucketRequest = () => {
  return {
    type: FETCH_BUCKETS_REQUEST
  }
}

export const fetchBucketSuccess = buckets => {
  return {
    type: FETCH_BUCKETS_SUCCESS,
    payload: buckets
  }
}

export const fetchBucketFailure = error => {
  return {
    type: FETCH_BUCKETS_FAILURE,
    payload: error
  }
}
