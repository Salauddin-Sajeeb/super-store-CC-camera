import { Alert } from '@mui/material';
import React, { useState } from 'react';
import useAuth from '../../../Hooks/useAuth';

const MakeAdmin = () => {
    const [email, setemail] = useState()
    const [success, setSuccess] = useState(false)
    const { token } = useAuth()
    const handleOnblr = e => {
        setemail(e.target.value)
    }
    const handleAdmin = e => {

        fetch('https://immense-beyond-10275.herokuapp.com/users/admin', {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ email })
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    setSuccess(true)

                }
                console.log(data)
            })
        e.preventDefault()
    }

    return (
        <div>
            <h1 className="text-danger mb-5">Add a New Admin </h1>
            <form onSubmit={handleAdmin}>
                <input className="mb-3" onBlur={handleOnblr} type='email' /> <br />
                <button type='submit'>make admin</button>

            </form>
            {success && <Alert severity="success">admin created successfully</Alert>}
        </div>
    );
};

export default MakeAdmin;