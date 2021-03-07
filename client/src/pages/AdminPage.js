import React, {useEffect, useState} from 'react'
import {useHttp} from "../hooks/useHttp";
import Input from "../components/Forms/Input/Input";
import Button from "../components/Buttons/Button";
import classes from './styles/AuthPage.module.scss'


const AdminPage = () => {

    const {loading, error, request} = useHttp()
    const [message, setMessage] = useState('')
    const [form, setForm] = useState({
        countryCode: ''
    })

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value})
    }

    const addCountryHandler = async() => {
        try{
            const data = await request('/api/country/add', 'POST', {...form})
            setMessage(data.message || '')
            console.log(data.message)
        } catch(e){

        }
    }

    const getCountries = async() => {
        try{
            const data = await request('/api/country/get', 'POST', {})
            setMessage(data.message || '')
            console.log(data)
        } catch(e){

        }
    }

    useEffect(() => {
        getCountries()
    }, [])

    return(
        <div>
            <Input
                label={"Country code:"}
                onChange={changeHandler}
                name={"countryCode"}

            />
            {message}
            <Button
                onClick={addCountryHandler}
                disabled={loading}
                label={"Sign Up"}
                className={[classes.SignUpButton, classes.FormButton].join(" ")}
            />
        </div>
    )
}


export default AdminPage