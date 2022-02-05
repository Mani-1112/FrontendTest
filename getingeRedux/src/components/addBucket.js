import React from 'react'
import { render } from 'react-dom'
import { useContext, useState, useEffect } from "react";
import { Context } from "../context";

function addBucket() {

    const [createbucket, setCreatebucket] = useContext(Context);
    const [location, setLocation] = useState(null);
    const [selectLocation, setSelectLocation] = useState("");
    const [bucketName, setBucketName] = useState("");

    const fetchURL = "https://challenge.3fs.si/storage/locations"
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
    getData().then((data) => setLocation(data))
    }, [])

 const createBucket = async () => {

    if( bucketName==="" || selectLocation==="" || selectLocation==="Please select a location"){
        alert("Either of the fields are not correct");
    } else {
 
    let response = await fetch(`https://challenge.3fs.si/storage/buckets`, {
        method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token d87349cf-6e51-40da-b659-8a531469dfdb',
          },
          body: JSON.stringify({'name': bucketName, 'location': selectLocation })
      })

    let result = await response.json();
    console.log("result",result);
    
    setCreatebucket(!createbucket);
    window.location.reload(false);
    }
  }

return(
<>
    Create New Bucket
    <table>
        <tbody>
            <tr>
                <th>Bucket Name*</th>
                <th>Bucket Location*</th>
            </tr>
            <tr>
                <td><input placeholder="MyNewStorage" onChange={ (event)=> setBucketName(event.target.value) }></input>
                </td>
                <td><select onChange={ (event)=> setSelectLocation(event.target.value) }>
                        <option value="" selected>Please select a location</option>
                        {location && location.locations.map(locations => (
                        <option key={locations.id} value={locations.id}>{locations.id}</option>
                        ))}
                    </select>
                </td>
            </tr>
        </tbody>
    </table>
    <button onClick={createBucket}>Create Bucket</button>
</>

);
}

export default addBucket;