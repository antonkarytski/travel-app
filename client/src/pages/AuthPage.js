import React, {useState, useEffect, useContext} from 'react'
import {useHttp} from "../hooks/useHttp";
import {AuthContext} from "../context/AuthContext";
import classesCss from "./styles/AuthPage.module.scss"
import AuthForm from "../components/Forms/AuthForm";

export const AuthPage = () => {

    const {loading, error, request} = useHttp()
    const [message, setMessage] = useState('')
    const auth = useContext(AuthContext)


    const requestHandler = async(form) => {
        try{
            const data = await request('/api/auth/register', 'POST', {...form})
            setMessage(data.message || '')
        } catch(e){

        }
    }

    const loginHandler = async(form) => {
        try{
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
            setMessage(data.message || '')
        } catch(e){
        }
    }

    useEffect(() => {
        setMessage(error)
    }, [error])

    return (
        <div className={classesCss.AuthPage}>
            <AuthForm
                classes={classesCss}
                message={message}
                loginHandler={loginHandler}
                signUpHandler={requestHandler}
                waitCondition={loading}
            />
        </div>
    )
}