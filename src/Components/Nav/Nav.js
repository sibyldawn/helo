import React, { Component } from 'react';
import './Nav.css';
import { Routes,Link } from 'react-router-dom';
import axios from 'axios';



export default class  extends Component {

    logout = () => {
        axios.post('/logout').then(response => {
          this.setState({ user: null });
        }).catch(error => {
          this.setState({ message: 'Something went wrong' });
        });
      };
    

    render() {
            return (
                <div className="nav-wrap">
                    <div className="profile">
                    <div className="userimg"><img src="https://pbs.twimg.com/profile_images/948294484596375552/RyGNqDEM_400x400.jpg"/></div>
                    <div className="username">GRUMPY CAT</div>
                    <div className="navlinks">
                        <Link to='/dashboard'>Home</Link>
                        <br/>
                        <Link to='/form'>New Post</Link>
                        <br/>
                        <button className="bottom" onClick={this.logout}><Link to='/'>Logout</Link></button>
                    </div>
                    </div>     
                 </div>
        );
    }
}
