import { Rating, Typography } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useForm } from "react-hook-form";



const Addreview = () => {
    const [value, setValue] = React.useState(2);
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data => {
        console.log(data);
        axios.post('http://localhost:5000/reviews', data)
            .then(res => {

                alert("Review added succesfully");
                reset();


            })

    }
    return (
        <div>

            <div className="add-service mt-4">
                <h2>Add a Feedback Here</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input {...register("name", { required: true, maxLength: 20 })} placeholder="name" />
                    <textarea {...register("description")} placeholder="description" />
                    <Typography component="legend">give rating</Typography>
                    <Rating
                        name="simple-controlled"
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                    />

                    <input type="submit" />
                </form>
            </div>
        </div>
    );
};

export default Addreview;