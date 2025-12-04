import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
});

type FormFields = z.infer<typeof schema>;

const CreateUser = () => {    

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>({
        defaultValues: {
        name: "user",
        email: "test@email.com",
        },
        resolver: zodResolver(schema),
    });

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        axios.post('http://localhost:5293/api/Users', data)
            .then(response => {
            console.log(response)
            }).catch( response => {

                console.log('response bad request', response.response.data.invalidField)
                response.response.data.errors.forEach(element => {
                    setError(response.response.data.invalidField, {
                        message: response.response.data.errorMessage,
                    });
                });    
            })
    };

    return (
        <form className="tutorial gap-2" onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name")} type="text" placeholder="Name" />
        {errors.name && (
            <div className="text-red-500">{errors.name.message}</div>
        )}    
        <input {...register("email")} type="text" placeholder="Email" />
        {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
        )}
        <input {...register("password")} type="password" placeholder="Password" />
        {errors.password && (
            <div className="text-red-500">{errors.password.message}</div>
        )}
        <button disabled={isSubmitting} type="submit">
            {isSubmitting ? "Loading..." : "Submit"}
        </button>
        {errors.root && <div className="text-red-500">{errors.root.message}</div>}
        </form>
    );
};

export default CreateUser;