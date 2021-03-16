import React, {useState, useEffect, useContext} from 'react'
import {useHttp} from "../hooks/useHttp";
import {AppContext} from "../context/AppContext";
import classesCss from "./styles/AuthPage.module.scss"
import AuthForm from "../components/Forms/AuthForm";
import { withRouter } from 'react-router-dom';

const AuthPage = ({history, updateSearch, langExtraData}) => {


    const {loading, error, request} = useHttp()
    const [message, setMessage] = useState('')
    const auth = useContext(AppContext)


    const loginHandler = async(form) => {
        try{
            const data = await request('/api/auth/login', 'POST', {...form})
            if(data.token){
                auth.login(data.token, data.userData)
                setMessage(data.message || '')
                history.push('/')
            }

        } catch(e){
        }
    }

    const requestHandler = async(form) => {
        try{
            const data = await request('/api/auth/register', 'POST', {...form})
            if(data.message === "You successfully registered"){
                await loginHandler(form)
                history.push('/user')
            }
            setMessage(data.message || '')
        } catch(e){

        }
    }


    useEffect(() => {
        setMessage(error)
    }, [error])

    useEffect(() => {
        updateSearch({ exists: false });
    }, []);

    return (
        <div className={classesCss.AuthPage}>
            <AuthForm
                classes={classesCss}
                message={message}
                loginHandler={loginHandler}
                signUpHandler={requestHandler}
                waitCondition={loading}
                langExtraData={langExtraData}
            />
        </div>
    )
}

export default withRouter(AuthPage)