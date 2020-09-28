import React from 'react';
import MyNavbar from './MyNavbar'

class About extends React.Component{
    render(){
        return(
            <div>
                <MyNavbar/>
                <div style={{margin:'20px 100px', style:'Raleway'}}>
                    <div style={{display:'flex', justifyContent:'center'}}>
                        Sukhvir Singh &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        Tyler Tran &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        Rich Chao
                    </div>
                    <br/>
                    <div style={{display:'flex', justifyContent:'center'}}>CMPE 255 - Sec 05</div>
                </div>
            </div>
        );
    }
}

export default About