import axios from 'axios';
import React, { useState } from 'react';

function StudentSignup() {
    var [username, setUsername] = useState("");
    var [password, setPassword] = useState("");

    const handlesubmit = (e) => {
        e.preventDefault()
        var student = {
            username : username,
            password : password
        }
        console.log(username + " " + password);
        alert(username + " " + password);
        axios.post('http://localhost:8081/student/signup', { username: username, password: password })
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => console.log(err))
    }
    return (
        <div>
            <form onSubmit={handlesubmit}>
                <h3>Register</h3>
                <div className="form-group">
                    <label>Username</label>
                    <input value={username} type="text" onChange={(e) => setUsername(e.target.value)} className="form-control" placeholder="username" />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input value={password} type="password" onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="password" />
                </div>
                <button type="submit" className="btn btn-dark btn-lg btn-block">Signup</button>
                <p className="forgot-password text-right">
                    Donn't have account? <a href="#">Register here</a>
                </p>
            </form>
        </div >
    );
}

export default StudentSignup;