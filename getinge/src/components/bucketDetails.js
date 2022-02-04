import React, {useRef, useState, useEffect} from 'react'
import { render } from 'react-dom'
import { useParams, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

function bucketDetails(props) {
    const { bucketid } = useParams();
    const location = useLocation();
    const bucketLoc = location.state;    
    const hiddenFileInput = useRef(null);    
    const [objects, setObjects] = useState(null);
    const [tab, setTab] = useState('files');
    const [objectFile, setObjectFile] = useState("");

    const fetchURL = `https://challenge.3fs.si/storage/buckets/`+bucketid+`/objects`
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
        getData().then((data) => setObjects(data))
    }, [])

    const handleClick = event => {
        hiddenFileInput.current.click();
      };

    const handleChange = async (event) => {

      const fileUploaded = event.target.files[0];    
      let formData = new FormData();
      formData.append("file", fileUploaded);

      let URL = `https://challenge.3fs.si/storage/buckets/`+bucketid+`/objects`;
      console.log(URL);      
 
        let response = await fetch(URL, {
            method: 'POST',
              headers: {
              'Authorization': 'Token d87349cf-6e51-40da-b659-8a531469dfdb',
              },
              body: formData
          })
         setObjectFile("");
         window.location.reload(false);
     }

    const deleteFile = async (event) => {    
 
        if(objectFile===""){
            alert("No File selected, Please click on any filename to be selected for deletion");
        } else {
            if (confirm("Do you really want to delete this object") == true) {
                let URL = `https://challenge.3fs.si/storage/buckets/`+bucketid+`/objects/`+objectFile;
                console.log(URL);
            
                let response = await fetch(URL, {
                    method: 'DELETE',
                    headers: {
                    'Authorization': 'Token d87349cf-6e51-40da-b659-8a531469dfdb',
                    }
                })
                
                let result = await response.text();
                console.log("result delete",result);
                setObjectFile("");
                window.location.reload(false);
            }
        }
    }

    const deleteBucket = async (event) => {    
 
        if (confirm("Do you really want to delete this Bucket") == true) {
            let URL = `https://challenge.3fs.si/storage/buckets/`+bucketid;
            console.log(URL);
        
            let response = await fetch(URL, {
                method: 'DELETE',
                headers: {
                'Authorization': 'Token d87349cf-6e51-40da-b659-8a531469dfdb',
                }
            })
            
            let result = await response.text();
            console.log("result delete",result);
        }
    }

return(
<div className="customFont">
    <div className="header">SECURE CLOUD STORAGE<Link to={`/`}>(back)</Link></div>
    <h1>{bucketid}</h1>
    <button className={(tab==='files'?'button-clicked':'')} onClick={()=> setTab('files')}>Files</button>
    <button className={(tab==='details'?'button-clicked':'')} onClick={()=> setTab('details')}>Bucket Details</button>
    {tab==='files'?(
    <div className="grid-container">
        <div className="grid-item item1">All Files ({ objects ? objects.objects.length: 0})</div>
        <div className="grid-item item2">
            <button value="Upload" onClick={handleClick}>Upload Object</button>
            <input type="file" ref={hiddenFileInput} onChange={handleChange} style={{display: 'none' }} />
            <button onClick={deleteFile}>Delete Object</button>
        </div>
        <div className="grid-item item3">
            <table className="grid-table">
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Last Modified</th>
                        <th>Size</th>
                    </tr>
                    {objects && objects.objects.map(object => (
                    <tr key={object.name} onClick={()=>{setObjectFile(object.name)}}>
                        <td>
                            {object.name}
                        </td>
                        <td>
                            {object.last_modified}
                        </td>
                        <td>
                            {object.size}
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    ) : (
    <div className="grid-container">
        <div className="grid-item item1">
            <div> Bucket Name : {bucketid}</div>
            <div> Location : {bucketLoc}</div>
            <div> Storage : {objects.objects.reduce((pv, cv) => pv + cv.size, 0)}</div>
        </div>
        <div className="grid-item item2">
            <button onClick={deleteBucket}>Delete Bucket</button>
        </div>
    </div>
    )}
    <div className="footer">#</div>
    </div>
    )
 }

export default bucketDetails;