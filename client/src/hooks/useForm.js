import {useState} from 'react'


const useForm = (initial) => {
    const [form, setForm] = useState(initial)

    const formChangeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    return [form, formChangeHandler]
}

export default useForm