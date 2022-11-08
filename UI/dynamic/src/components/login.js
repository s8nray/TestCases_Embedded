import React from 'react'
import { grey } from "@mui/material/colors"
import Button from '@mui/material/Button';
import "../index.css"
import { flexbox } from "@mui/system";
import { ViewColumn } from "@mui/icons-material";

class Login extends React.Component {

   
    render(){
    return(
        
            <div className=" app-container" >
                <div className="new-login-page">
                    <p className='fast-text'>FAST</p>
                    <p className='fast-text-10'>Framework Automation of Software Testing</p>
                </div>
                <div style={{marginTop:30}}>
                    <div>
                         <label htmlFor='userName' className='input-field-label'>User Name</label>
                            <br/>
                         <input type="text" id="userName" placeholder='Enter UserName' className='input-field-username-password' onBlur={this.onBlurUserName}/>
                </div>
                <div style={{marginTop:30}}>
                        <label htmlFor='password' className='input-field-label'>Password</label>
                            <br/>
                        <input type="password" id="password" placeholder='Enter Password' className='input-field-username-password' onBlur={this.onBlurPassword}/>
                </div>
                <div className='login-button-container'>
                <Button type="button" variant="contained" onClick={event =>  window.location.href='/intialScreen' } style={{marginTop:50 }} >Login</Button>
                </div>
                </div>
            </div>
    )}}

export default Login



