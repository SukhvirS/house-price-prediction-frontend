import React from 'react';
import MyNavbar from './MyNavbar';
import {Map, GeoJSON, TileLayer, LayersControl} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import states from './states.json';

class Home extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            currentState: null,
            latitude: 37.334665328,
            longitude: -121.875329832,
        }

        this.onStateClick = this.onStateClick.bind(this);
        this.onEachState= this.onEachState.bind(this);
        this.onStateMouseover = this.onStateMouseover.bind(this);
        this.onStateMouseout = this.onStateMouseout.bind(this);

    }

    onStateClick(event){
        this.setState({
            currentState: event.target.feature.properties.NAME,
        })
    }

    onStateMouseover(event){
        event.target.setStyle({
            fillOpacity: 0.9,
        });
    }

    onStateMouseout(event){
        event.target.setStyle({
            fillOpacity: 0,
        });
    }

    onEachState(state, layer){
        var stateName = state.properties.NAME;
        layer.bindPopup(stateName);

        layer.on({
            click: this.onStateClick,
            mouseover: this.onStateMouseover,
            mouseout: this.onStateMouseout,
        })
    }

    render(){

        var stateStyle = {
            color: '#2e2e2e',
            weight: .5,
            fillColor: "#2e2e2e",
            fillOpacity: 0,
        }

        return(
            <div>
                <MyNavbar/>
                <div style={{margin:'20px 100px', fontFamily:'Raleway'}}>
                    <Map style={{height:'calc(100vh - 200px)', width:'45vw', float:'left', border:'1px solid black'}} zoom={4} center={[37,-98]}>
                        <LayersControl position="topright">

                            <LayersControl.BaseLayer name="Satellite">
                                <TileLayer
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png"
                                />
                            </LayersControl.BaseLayer>

                            <LayersControl.BaseLayer name="Street">
                                <TileLayer
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                            </LayersControl.BaseLayer>

                            <LayersControl.BaseLayer name="Topology" checked>
                                <TileLayer
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}.png"
                                />
                            </LayersControl.BaseLayer>

                            <LayersControl.BaseLayer name="Terrain">
                                <TileLayer
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}.png"
                                />
                            </LayersControl.BaseLayer>

                            <LayersControl.BaseLayer name="Dark">
                                <TileLayer
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
                                />
                            </LayersControl.BaseLayer>

                            <LayersControl.Overlay name="Show Counties" checked>
                                <GeoJSON data={states.features}  style={stateStyle} onEachFeature={this.onEachState}/>
                            </LayersControl.Overlay>

                        </LayersControl>
                    </Map>
                </div>
                <div style={{float:'right', width:'45vw', paddingLeft:'30px'}}>
                    {
                        this.state.currentState === null ?
                        <h4>Select a state to begin.</h4>
                        :
                        <h4>{this.state.currentState}</h4>
                    }
                </div>
            </div>
        );
    }
}

export default Home