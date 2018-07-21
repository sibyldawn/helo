import React, { Component } from 'react';
import axios from 'axios';
import './Auth.css';
import { Link } from 'react-router-dom';


export default class Auth extends Component {
    constructor(){
        super();

        this.state={
            user: null,
            message: null,
            name:'',
            password:'',
        }
    
    }
    register=()=>{
        this.setState({ message:null });
        const username = this.state.name;
        const password = this.state.password;
        axios.post('/api/users/register', {
            username,
            password,
        }).then(response => {
            console.log(response);
            this.setState({ user: response.data});
        }).catch( error => {
            this.setState({ message: 'Something went wrong'});
        });
    };

    login = () => {
        this.setState({ message:null});
        const username = this.state.name;
        const password = this.state.password;
        axios.post('/api/users/login',{
            username,
            password
        }).then( response => {
            console.log('login response', response);
            this.setState({ user: response.data});
            // this.props.history.push('/dashboard');
        }).catch( error => {
            this.setState({ message: 'Something went wrong' + error})
        })
    }

   
    handleUsernameChange(name){
        console.log('-----stateName',this.state.name);
        this.setState({
            name: name
        });
    }

   handlePasswordChange(password){
        console.log('-----password',this.state.password);
       this.setState({
             password: password
        })
    }


    render() {
        return (
            <div className="authBox">
                <div className="subheader">
                    <img src="https://raw.githubusercontent.com/sibyldawn/simulation-3/master/assets/helo_logo.png"/>
                    <h1>Helo</h1>
                </div>
                <div className="input">
                <input type="text" placeholder="Username" onChange={(e)=>this.handleUsernameChange(e.target.value)}/>
                <br/>
                <input type="text" placeholder="Password" onChange={(e) => this.handlePasswordChange(e.target.value)}/>
                <br/>
                <button onClick={this.login}><Link to='/dashboard'>Login</Link></button>
                <button onClick={this.register}>Register</button>
                </div>

            </div>
        );
    }
}