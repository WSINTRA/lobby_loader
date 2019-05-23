import React from 'react';

function Register(props) {

return (
    <div> 
    <h1> Register New User </h1>
    <label>Email</label>
    <input name="email"onChange={(e)=>props.loginFormControl(e)}type="text" placeholder="email" value={props.email}/>
    <label>Username </label>
    <input name="username"onChange={(e)=>props.loginFormControl(e)}type="text" placeholder="username" value={props.username}/>
    <br/><label>Password </label>
    <input name="password"onChange={(e)=>props.loginFormControl(e)}type="password" placeholder="password" value={props.password}/>
    <br/><label>Confirm Password </label>
    <input name="confirmPass"onChange={(e)=>props.loginFormControl(e)}type="password" placeholder="confirm password" value={props.confirmPassword}/>
    <button  onClick={(e)=>props.submit(props)}>Register</button>
    </div>
	);
}

export default Register;