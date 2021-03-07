import React, {useState, useEffect, useContext} from 'react'
import {useHttp} from "../hooks/useHttp";
import {AuthContext} from "../context/AuthContext";
import InputText from "../components/Forms/Input/InputText";
import InputPassword from "../components/Forms/Input/InputPassword";
import classesCss from "./styles/AuthPage.module.scss"
import Button from "../components/Buttons/Button";

export const AuthPage = () => {

    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const {loading, error, request} = useHttp()
    const [message, setMessage] = useState('')
    const auth = useContext(AuthContext)

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
            <div className={classesCss.AuthForm}>
                <div className={classesCss.FormMessage}>{message}</div>
                <InputText
                    className={classesCss.AuthInput}
                    label={"Login: "}
                    name={'email'}
                    id={"authEmail"}
                    type="text"
                    onChange={changeHandler}
                />
                <InputPassword
                    className={classesCss.AuthInput}
                    name={'password'}
                    id={"authPassword"}
                    label={"Password: "}
                    onChange={changeHandler}
                />
                <div className={classesCss.AuthButtonSet}>
                    <Button
                        onClick={loginHandler}
                        disabled={loading}
                        label={"Sign In"}
                        className={[classesCss.SignInButton, classesCss.FormButton].join(" ")}
                    />

                    <Button
                        onClick={requestHandler}
                        disabled={loading}
                        label={"Sign Up"}
                        className={[classesCss.SignUpButton, classesCss.FormButton].join(" ")}
                    />
                </div>
            </div>
        </div>
    )
}