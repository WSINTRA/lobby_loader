import React from 'react';

function Login(props) {

return (
    <div> 
    <h1> Login Form </h1>
    <label>Username </label>
    <input name="username"onChange={(e)=>props.loginFormControl(e)}type="text" placeholder="username" value={props.username}/>
    <br/><label>Password </label>
    <input name="password"onChange={(e)=>props.loginFormControl(e)}type="password" placeholder="password" value={props.password}/>
    <button  onClick={(e)=>props.submit(props)}>Login</button>

    </div>
	);
}

export default Login;