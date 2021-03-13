import {useState, useEffect, useCallback} from 'react'


const useForm = (initial) => {
    const [form, setForm] = useState(initial)
    const formChangeHandler = useCallback(event => {
        console.log({...form})
        setForm({...form, [event.target.name]: event.target.value})
    }, [])

    return [form, formChangeHandler]
}

export default useForm