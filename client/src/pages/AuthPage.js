import React, {useState, useEffect} from 'react'
import {useHttp} from "../hooks/useHttp";

export const AuthPage = () => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const {loading, error, request, clearError} = useHttp()
    const [message, setMessage] = useState('')

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value})
    }

    const requestHandler = async() => {
        try{
            const data = await request('/api/auth/register', 'POST', {...form})
            setMessage(data.message || '')
        } catch(e){

        }
    }

    const loginHandler = async() => {
        try{
            const data = await request('/api/auth/login', 'POST', {...form})
            setMessage(data.message || '')
        } catch(e){

        }
    }

    useEffect(() => {
        setMessage(error)
    }, [error])

    return (
        <div>
            <div>
                <div>{message}</div>
                <label htmlFor="authLogin">Login:</label>
                <input
                    name={'email'}
                    id={"authEmail"}
                    type="email"
                    onChange={changeHandler}
                />
                <label htmlFor="authLogin">Password:</label>
                <input
                    name={'password'}
                    id={"authPassword"}
                    type={"password"}
                    onChange={changeHandler}
                />
                <button
                    onClick={requestHandler}
                    disabled={loading}
                >
                    Sign Up
                </button>
                <button
                    onClick={loginHandler}
                    disabled={loading}
                >Sign In
                </button>
            </div>
        </div>
    )
}