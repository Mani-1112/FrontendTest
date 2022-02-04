import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter,
    Routes,
    Route
  } from "react-router-dom";
import Dashboard from './dasboard';
import BucketDetails from './components/bucketDetails';


function App() {

return (
<BrowserRouter>
    <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route path="/bucket/:bucketid" element={<BucketDetails />} />
    </Routes>
</BrowserRouter>
);

}

ReactDOM.render(
<App />, document.getElementById('root'));