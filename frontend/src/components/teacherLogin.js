import axios from 'axios';
import React, { useState } from 'react';

function TeacherLogin(props) {
    var [teacher, setTeacher] = useState({});
    var [username, setUsername] = useState("");
    var [password, setPassword] = useState("");

    const  handlesubmit = async (e) => {
        e.preventDefault()
        setTeacher({
            username: username,
            password: password
        })
        await axios.post('http://localhost:8081/student/login', { teacher })
            .then((res) => {
                console.log(res.data);
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

export default TeacherLogin;