import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react'
import Navigation from './navigation'
import MapContainer from './mapContainer';

class Home extends React.Component {
    render() {
        return (
            <div>
                <Navigation />
                <MapContainer />
            </div>
        )
    }
}

export default Home;