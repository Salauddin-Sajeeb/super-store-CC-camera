import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import useAuth from '../../../Hooks/useAuth';



const Purchase = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { pd } = useParams()
    const { user } = useAuth()
    const [details, setDetails] = useState([])
    const [singleDetail, setSingleDetails] = useState({})

    useEffect(() => {
        fetch('https://immense-beyond-10275.herokuapp.com/packages')
            .then(res => res.json())
            .then(data => setDetails(data))
    }, [])
    useEffect(() => {
        const viewDetails = details.find(pack => pack._id == pd);
        setSingleDetails(viewDetails);

    }, [details])

    const onSubmit = data => {
        console.log(data)
        fetch('https://immense-beyond-10275.herokuapp.com/orders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                if (result.insertedId) {
                    alert('order confirm successfully');
                    reset();
                }


            })
    }



    return (
        <div>

            <div className="row mt-5">
                <div className="col-md-6">
                    <h3>{singleDetail?.name}</h3>
                    <img className="img-fluid" src={singleDetail?.img} alt="" />
                    <p>{singleDetail?.description}</p>
                </div>
                <div className="col-md-6">
                    <h1>Order confirm</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <input className="m-2" defaultValue={user.displayName} {...register("name")} />

                        <input className="m-2" defaultValue={user.email} {...register("email", { required: true })} />
                        {errors.email && <span className="error">This field is required</span>}
                        <input className="m-2" placeholder="Address" defaultValue="" {...register("address")} />
                        <input className="m-2" placeholder="City" defaultValue="" {...register("city")} />
                        <input className="m-2" placeholder="phone number" defaultValue="" {...register("phone")} />

                        <input type="submit" />
                    </form>
                </div>

            </div>
        </div>
    );
};

export default Purchase;