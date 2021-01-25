import axios from 'axios';
import React, { useState } from 'react';

function StudentLogin(props) {
    var [student, setStudent] = useState({});
    var [username, setUsername] = useState("");
    var [password, setPassword] = useState("");

    const  handlesubmit = async (e) => {
        e.preventDefault()
        setStudent({
            username: username,
            password: password
        })
        await axios.post('http://localhost:8081/student/login', { student })
            .then((res) => {
                console.log(res.data);

                window.location = '/studentdashboard';
            })
            .catch(err => console.log(err));
    }

    return (
        <div>
            <form onSubmit={handlesubmit}>
                <h3>Login</h3>
                <div className="form-group">
                    <label>Username</label>
                    <input value={username} type="text" onChange={(e) => setUsername(e.target.value)} className="form-control" placeholder="username" />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input value={password} type="password" onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="password" />
                </div>
                <button type="submit" className="btn btn-dark btn-lg btn-block">Login</button>
                <p className="forgot-password text-right">
                    Donn't have account? <a href="">Register here</a>
                </p>
            </form>
        </div >
    );
}

export default StudentLogin;