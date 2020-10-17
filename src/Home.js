import React from 'react';
import MyNavbar from './MyNavbar';
import BackgroundImage from './images/house.jpg';
import StateSelector from './StateSelector';

class Home extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            latitude: 37.334665328,
            longitude:  -121.875329832,
            currentState: 'CA',
            currentCity: 'San Jose',
            bedrooms: 3,
            bathrooms: 2,
            sqft: 1200,
            prediction: null,

        }

        // this.getLocation = this.getLocation.bind(this);
        this.getCoordinates = this.getCoordinates.bind(this);
        this.getPrediction = this.getPrediction.bind(this);
        this.changeState = this.changeState.bind(this);

    }

    componentDidMount(){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.getCoordinates);
        } else {
            alert("Geolocation is not supported by this browser.");
        }

        // var accessToken = 'pk.9707befe103af84b15cd102037a4e0fe';
        // var url = 'https://us1.locationiq.com/v1/reverse.php?key='+accessToken+'&lat='+this.state.latitude+'&lon=-'+this.state.longitude+'&format=json';
        
    }

    getCoordinates(position){
        this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
        var url = 'https://api.bigdatacloud.net/data/reverse-geocode-client?latitude='+this.state.latitude+'&longitude='+this.state.longitude+'&localityLanguage=en'
        fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            this.setState({
                currentCity: data['locality'],
                currentState: data['principalSubdivision'],
            })
        })
    }

    changeState(childData){
        this.setState({
            state: childData,
        })
    }

    getPrediction(event){
        event.preventDefault();

        var bedroomInput = document.getElementById('bedroomInput').value;
        var bathroomInput = document.getElementById('bathroomInput').value;
        var cityInput = document.getElementById('cityInput').value;
        var sqftInput = document.getElementById('sqftInput').value;

        this.setState({
            bedrooms: bedroomInput,
            bathrooms: bathroomInput,
            city: cityInput,
            sqft: sqftInput
        })


        fetch('/getPrediction', {
            method: "POST",
            body: JSON.stringify({
                state: this.state.currentState,
                city: cityInput,
                bedrooms: bedroomInput,
                bathrooms: bathroomInput,
                sqft: sqftInput,
            })
        })
        .then(res => res.json())
        .then(data => {
            var x = data
            this.setState({
                prediction: '$' + x['prediction'],
            })
        })
    }

    handleBedroomChange(event){
        this.setState({
            bedrooms: event.target.value,
        })
    }

    handleBathroomChange(event){
        this.setState({
            bathrooms: event.target.value,
        })
    }

    handleCityChange(event){
        this.setState({
            city: event.target.value,
        })
    }

    handleSqftChange(event){
        this.setState({
            sqft: event.target.value,
        })
    }

    render(){
        const style={
            width:'100vw',
            height:'calc(100vh)',
            backgroundImage: "url(" + BackgroundImage + ")",
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat:'no-repeat',
        }

        return(
            <div style={style}>
                <MyNavbar color='white'/>
                <div style={{width:'45vw', margin:'5% auto 0 auto', backgroundColor:'white', borderRadius:'12px', padding:'30px'}}>
                    <h4>Prediction: {this.state.prediction}</h4>
                    <hr/>
                    <div id='myLocationForm'>
                        <h3>{this.state.currentCity}, {this.state.currentState} <p style={{color:'grey', fontSize:'16px'}}>({this.state.latitude}, {this.state.longitude})</p></h3>
                        {/* <p>Your location:({this.state.latitude}, {this.state.longitude})</p> */}
                    </div>
                    <br/>
                    <div>
                        <form onSubmit={this.getPrediction}>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">State</label>
                                <div className="col-sm-10">
                                    <StateSelector parentCallback={this.changeState}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">City</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" id="cityInput" placeholder="San Jose" required/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Bedrooms</label>
                                <div className="col-sm-10">
                                    <input type="number" className="form-control" id="bedroomInput" placeholder="3" min='1' required/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Bathrooms</label>
                                <div className="col-sm-10">
                                    <input type="number" className="form-control" id="bathroomInput" placeholder="2" min='1' required/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Sqft.</label>
                                <div className="col-sm-10">
                                    <input type="number" className="form-control" id="sqftInput" placeholder="1200" min='1' required/>
                                </div>
                            </div>
                            <br/>
                            <button type='submit' className="btn btn-primary">Get Prediction</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home