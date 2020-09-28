import React from 'react';
import {Link} from 'react-router-dom';
// import './MyNavbar.css';

class MyNavbar extends React.Component{

    render(){
        return(
            <div style={{padding:'40px 100px', fontFamily:'Raleway'}}>
                <Link to='/' style={{float:'left', color:'black'}}><h4>Home</h4></Link>
                <Link to='/about' style={{float:'right', color:'black'}}><h4>About</h4></Link>
            </div>
        )
    }

}

export default MyNavbar;