import React from 'react'
import ReactDOM from 'react-dom'
import { useState, useEffect } from "react"
import AddBucket from './components/addBucket'
import { Context } from "./context.js"
import { Link } from "react-router-dom"

import './App.css';

function dashboard() {
  const [createbucket, setCreatebucket] = useState(false);
  const [data, setData] = useState(null);

    const fetchURL = `https://challenge.3fs.si/storage/buckets`
    const getData = () =>
      fetch(`${fetchURL}`,{
        method: 'GET',
          headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token d87349cf-6e51-40da-b659-8a531469dfdb',
          }
      })
        .then((res) => res.json());

    useEffect(() => {
        getData().then((data) => setData(data))
    }, [])

  return (
<>
  <Context.Provider value={[createbucket, setCreatebucket]}>
    <div className="customFont">
      <div className="header">SECURE CLOUD STORAGE</div>
      <h1> Bucket List</h1>

      {createbucket?
      <AddBucket /> :""}

      <div className="grid-container">

        <div className="grid-item item1">All Buckets ( { data ? data.buckets.length: 0} ) </div>
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
              {data && data.buckets.map(buckets => (
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
);
}

export default dashboard