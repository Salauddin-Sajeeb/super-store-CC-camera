import axios from 'axios';
import React from 'react';
import { useForm } from "react-hook-form";


import './addservice.css'
const AddService = () => {
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data => {
        console.log(data);
        axios.post('https://immense-beyond-10275.herokuapp.com/packages', data)
            .then(res => {

                alert("new data added successfully");
                reset();


            })

    }
    return (
        <div>

            <div className="add-service mt-4">
                <h2>Add a CC Camera Package</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input {...register("name", { required: true, maxLength: 20 })} placeholder="name" />
                    <textarea {...register("description")} placeholder="description" />
                    <input type="number" {...register("price")} placeholder="price" />
                    <input {...register("img")} placeholder="photo Url" />
                    <input type="submit" />
                </form>
            </div>
        </div>
    );
};

export default AddService;