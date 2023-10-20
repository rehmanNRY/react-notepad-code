import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Signup = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.authToken) {
            const path = "/home";
            navigate(path);
        }
        // eslint-disable-next-line
    }, [])

    const [form, setForm] = useState({ fullName: "", email: "", password: "" });
    const signup = async (name, email, password) => {
        try {
            const host = "http://localhost:5000";
            const url = `${host}/api/auth/createuser`;
            const bodyData = JSON.stringify({ name, email, password })
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: bodyData
            });
            const myJson = await response.json(); //extract JSON from the http response
            if (myJson.authToken) {
                // Saving token in local storage
                localStorage.setItem('authToken', myJson.authToken);
                // Redirecting to the Success path
                const path = "/home";
                navigate(path);
                // console.log(myJson.authToken)
            }
            else{
                console.log("Invalid creentials");
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
        signup(form.fullName, form.email, form.password);
        setForm({ fullName: "", email: "", password: "" })
    }
    return (
        <form className='container col-sm-6' onSubmit={submitForm} autoComplete="off">
            <h2 className='my-4'>Create your account Now</h2>
            <div className="mb-3">
                <label htmlFor="fullName" className="form-label">Full Name</label>
                <input type="text" className="form-control" value={form.fullName} name="fullName" minLength="3" onChange={onChange} id="fullName" />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" value={form.email} onChange={onChange} id="email" name='email' />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" value={form.password} onChange={onChange} minLength="5" id="password" name='password' />
            </div>
            <button type="submit" className="btn btn-success">Sign up</button>
        </form>
    )
}
