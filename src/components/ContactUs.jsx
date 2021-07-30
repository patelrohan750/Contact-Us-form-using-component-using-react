import React, { useState, useEffect } from 'react'
import InputField from './inputField'
import TextArea from './TextArea';
import { useForm } from "react-hook-form";
import axios from 'axios';
const getLocalUserData = () => {
    let userInfo = localStorage.getItem('userInfo');
    // console.log(userInfo);
    if (userInfo) {
        return JSON.parse(localStorage.getItem('userInfo'))
    } else {
        return []
    }
}

const ContactUs = () => {
    const { register, handleSubmit,reset , formState: { errors }, } = useForm();
    const [userData, setUserData] = useState(getLocalUserData())
    const onSubmit = (data, e) => {
        console.log(data);
        setUserData([
            ...userData, data
        ])
       
        if(data){
            storeInJsonFile(data)
        } 
        reset('', {
            keepValues: false,
        })
        e.target.reset();
    
    
    }
    const storeInJsonFile=async(data)=>{
        console.log(data);
        await axios.post('http://localhost:3003/users',data)
        console.log("successfully Saved In JSON File");
    }
    useEffect(() => {
        localStorage.setItem('userInfo', JSON.stringify(userData))
       
    }, [userData])

    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return (
        <div className="form_div">
            <form onSubmit={handleSubmit(onSubmit)} className="form_container">
                <div className="field">
                <label> Name</label>
                    <InputField type="text" name="name" placeholder="Enter Name"

                        {...register('name', {
                            required: "Name is required"

                        })}
                    />
                    <p className="custom_error"> {errors.name?.message}</p>
                </div>
                <div className="field">
                <label>Telephone</label>
                    <InputField type="number" name="telephone" placeholder="Enter Telephone "

                        {...register('telephone', {
                            required: "Telephone Number is required",
                            minLength: {
                                value: 10,
                                message: "Telephone Number Must Be 10 digit Number",
                            },
                            maxLength: {
                                value: 10,
                                message: "Telephone Number Must Be 10 digit Number",
                            },

                        })}
                    />
                    <p className="custom_error"> {errors.telephone?.message}</p>
                </div>

                <div className="field">
                <label>Email</label>
                    <InputField type="email" name="email" placeholder="Enter Email "

                        {...register('email', {
                            required: "Email is required",
                            pattern: { value: re, message: "Invalid Email" }

                        })}
                    />
                    <p className="custom_error"> {errors.email?.message}</p>
                </div>
                <div className="field">
                <label>Order Number</label>
                    <InputField type="number" name="ordernumber" placeholder="Order Number "
                        {...register('ordernumber')}
                    />
                </div>

                <div className="field">
                <label>Comment</label>
                    <TextArea name="comment" placeholder="Comment"
                        {...register('comment', {
                            required: "Comment is required"

                        })}
                    />
                    <p className="custom_error"> {errors.comment?.message}</p>

                </div>

                <div className="field">
                    <button type="submit">
                        submit
                    </button>
                </div>

            </form>
        </div>
    )
}

export default ContactUs
