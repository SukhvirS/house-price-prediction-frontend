import React from 'react';
import MyNavbar from './MyNavbar'
// import BackgroundImage from './images/house.jpg';

class About extends React.Component{
    render(){
        // const style={
        //     width:'100vw',
        //     height:'calc(100vh)',
        //     backgroundImage: "url(" + BackgroundImage + ")",
        //     backgroundSize: 'cover',
        //     backgroundPosition: 'center center',
        //     backgroundRepeat:'no-repeat',
        // }

        return(
            <div>
                <MyNavbar color='black'/>
                <div style={{margin:'20px 100px', style:'Raleway'}}>
                    <div style={{display:'flex', justifyContent:'center'}}>
                        Sukhvir Singh &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        Tyler Tran &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        Rich Chau &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        Roopesha Rai
                    </div>
                    <br/>
                    <div style={{display:'flex', justifyContent:'center'}}>CMPE 255 - Sec 05</div>
                </div>
            </div>
        );
    }
}

export default About