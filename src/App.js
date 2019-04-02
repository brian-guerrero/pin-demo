import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: []
    }
    this.initAutocomplete = this.initAutocomplete.bind(this);
    this.addMapMarker = this.addMapMarker.bind(this);
  }

  initAutocomplete(mapProps) {
    const { google } = mapProps;
    let autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete')
    )
    autocomplete.setFields(["geometry"]);
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        this.addMapMarker(place.geometry.location);
      }
    });
    this.forceUpdate();
  }

  addMapMarker(marker) {
    this.setState({
      markers: [{ lat: marker.lat(), lng: marker.lng() }]
    })
  }

  render() {
    let markers = Array.from(this.state.markers);
    return (
      <div className="App">
        <input type="text" id="autocomplete" />
        <Map
          google={this.props.google}
          initialCenter={{
            lat: 41.503152,
            lng: -90.550617
          }}
          onClick={this.props.google}
          zoom={14}
          onReady={this.initAutocomplete}
        >
          {markers.map((marker, index) => (
            <Marker key={index} position={{ lat: marker.lat, lng: marker.lng }} />
          ))}
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'ADD API KEY HERE'
})(App);
