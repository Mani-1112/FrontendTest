import React from 'react'
import ReactDOM from 'react-dom'
import { useState, useEffect } from "react"
import AddBucket from './components/addBucket'
import { Context } from "./context.js"
import { Link } from "react-router-dom"
import { connect } from 'react-redux'
import { fetchBuckets } from "./redux/index";
import './App.css';

function dashboard({ bucketData, fetchBuckets }) {
  const [createbucket, setCreatebucket] = useState(false);
  
  useEffect(() => {
      fetchBuckets()
  }, [])

//console.log("buckets", bucketData);

  return bucketData.loading ? (
    <h2>Loading</h2>
  ) : bucketData.error ? (
    <h2>{bucketData.error}</h2>
  ) : (
<>
  <Context.Provider value={[createbucket, setCreatebucket]}>
    <div className="customFont">
      <div className="header">SECURE CLOUD STORAGE</div>
      <h1> Bucket List</h1>
      {createbucket? <AddBucket /> :""}

      <div className="grid-container">
        <div className="grid-item item1">All Buckets ( { bucketData.data.buckets ? bucketData.data.buckets.length: 0} ) </div>
        <div className="grid-item item2">
          <button onClick={()=>setCreatebucket(!createbucket)}>Create New Bucket</button>
        </div>
        <div className="grid-item item3">
          <table>
            <tbody>
              <tr>
                <th>Name</th>
                <th>Location</th>
              </tr>
              {bucketData && bucketData.data.buckets && bucketData.data.buckets.map(buckets => (
                <tr key={buckets.id}>
                  <td>
                    <Link to={`/bucket/${buckets.id}`}
                      state={`${buckets.location.name}`}>
                      {buckets.name}
                   </Link>
                  </td>
                  <td>
                    {buckets.location.name}
                  </td>
                </tr>
                ))}
            </tbody>
          </table>
         </div>
      </div>

      <div className="footer">#</div>
    </div>
  </Context.Provider>
</>
)
}

const mapStateToProps = state => ({
    bucketData: state.bucket
})

const mapDispatchToProps = {
    fetchBuckets
}

export default connect(mapStateToProps, mapDispatchToProps) (dashboard)