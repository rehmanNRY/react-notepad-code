import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if(localStorage.authToken){
            const path = "/home";
            navigate(path);
        }
         // eslint-disable-next-line
    }, [])
    
    const [form, setForm] = useState({ email: "", password: "" });
    const login = async (email, password) => {
        try {
            const host = "http://localhost:5000";
            const url = `${host}/api/auth/login`;
            const bodyData = JSON.stringify({ email, password })
            const response = await fetch(url, {
                method: 'POST',
                body: bodyData,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const myJson = await response.json(); //extract JSON from the http response
            if (myJson.authToken) {
                localStorage.setItem('authToken', myJson.authToken);
                const path = "/home";
                navigate(path);
                // console.log(myJson.authToken)
            }
            else{
                console.log("Some error occur write correct credentials")
            }
        } catch (error) {
            console.log("Some error occured!");
        }
    }
    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    const submitForm = (e) => {
        e.preventDefault();
        login(form.email, form.password);
        setForm({ email: "", password: "" })
    }
    return (
        <form className='container col-sm-6' onSubmit={submitForm} autoComplete="off">
            <h2 className='my-4'>Login to your account Now!</h2>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" value={form.email} onChange={onChange} id="email" name='email' />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" value={form.password} onChange={onChange} minLength="5" id="password" name='password' />
            </div>
            <button type="submit" className="btn btn-success">Login</button>
        </form>
    )
}