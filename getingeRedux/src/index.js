import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter,
    Routes,
    Route
  } from "react-router-dom";
import Dashboard from './dasboard';
import BucketDetails from './components/bucketDetails';
import store from './redux/store'
import { Provider } from 'react-redux'

function App() {

return (
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Dashboard />} />
                <Route path="/bucket/:bucketid" element={<BucketDetails />} />
            </Routes>
        </BrowserRouter>
    </Provider>
);

}

ReactDOM.render(
<App />, document.getElementById('root'));