import React from "react";
import Geocode from "react-geocode";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import senior_centers from "../constants/senior_centers.js";
import food_pantries from "../constants/food_pantries.js";
import soup_kitchens from "../constants/soup_kitchens.js";
import { ButtonGroup, ToggleButton } from "react-bootstrap";

class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: "",
      longitude: "",
      data: []
    };
  }

  displayMarkers() {
    return this.state.data.map((item, index) => {
      return (
        <Marker
          key={index}
          id={index}
          position={{
            lat: item.lat,
            lng: item.lng
          }}
        />
      );
    });
  }

  setAddresses(addressess) {
    let arr = [];
    Geocode.setApiKey(API_KEY);
    Geocode.setLanguage("en");
    for (let address in addressess) {
      Geocode.fromAddress(address).then(
        response => {
          const { lat, lng } = response.results[0].geometry.location;
          arr.push({ lat: lat, lng: lng });
        },
        error => {
          console.error(error);
        }
      );
    }
    console.log(arr);
    return arr;
  }

  handleClick(name) {
    switch (name) {
      case "food_pantry": {
        const arr = this.setAddresses(food_pantries);
        this.setState({ data: arr });
        break;
      }
      case "senior_centers": {
        const arr = this.setAddresses(senior_centers);
        this.setState({ data: arr });
        break;
      }
      case "soup_kitchen": {
        const arr = this.setAddresses(soup_kitchens);
        this.setState({ data: arr });
        break;
      }
      default:
        console.error("Invalid Option");
    }
  }

  componentDidMount() {
    this.setState({ data: this.setAddresses(food_pantries) });
    console.log(this.state.data);
  }

  render() {
    const mapStyles = {
      width: "100%",
      height: "90%"
    };

    const extractLatLong = position => {
      const lng = position.coords.longitude;
      const lat = position.coords.latitude;
      this.setState({ latitude: lat, longitude: lng });
      //   console.log(`longitude: ${ lng } | latitude: ${ lat }`);
    };

    setTimeout(() => {
      navigator.geolocation.clearWatch(watcher);
    }, 15000);

    const watcher = navigator.geolocation.watchPosition(extractLatLong);

    return (
      <div>
        <div className="d-flex flex-column">
          <ButtonGroup toggle className="mt-3">
            <ToggleButton
              variant="light"
              onClick={() => this.handleClick("food_pantry")}
              type="radio"
              name="radio"
              defaultChecked
              value="1"
            >
              Food Pantries
            </ToggleButton>
            <ToggleButton
              variant="light"
              onClick={() => this.handleClick("senior_centers")}
              type="radio"
              name="radio"
              value="2"
            >
              Senior Centers
            </ToggleButton>
            <ToggleButton
              variant="light"
              onClick={() => this.handleClick("soup_kitchen")}
              type="radio"
              name="radio"
              value="3"
            >
              Soup Kitchens
            </ToggleButton>
          </ButtonGroup>
        </div>
        <div>
          <Map
            google={this.props.google}
            zoom={6}
            style={mapStyles}
            initialCenter={{
              lat: 40.69744,
              lng: -73.97944
            }}
          >
            {this.displayMarkers()}
          </Map>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: API_KEY
})(MapContainer);
