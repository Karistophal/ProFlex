'use client';

import axios from 'axios';
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { GrApple } from "react-icons/gr";
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';


import useRegisterModal from '../../hook/useRegisterModal';
import useLoginModal from '../../hook/useLoginModal';

import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import Button from '../Button';



const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();

    const [isLoading, setIsLoading] = useState(false);


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/register', data)
            .then(() => {
                registerModal.onClose();
                toast.success("Account created successfully");
            })
            .catch((error) => {
                toast.error("Something went wrong. Please try again later");
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    const handleSwitchToLogin = () => {
        registerModal.onClose();
        loginModal.onOpen();
    }


    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading title='Register' subtitle='Create an account to continue' />
            <Input
                id='name'
                label='Name'
                required
                register={register}
                errors={errors}
            />
            <Input
                id='email'
                label='Email'
                type='email'
                required
                register={register}
                errors={errors}
            />
            <Input
                id='password'
                label='Password'
                type='password'
                required
                register={register}
                errors={errors}
            />
        </div>
    );

    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <Button
                outline
                label='Continue with Google'
                icon={FcGoogle}
                onClick={() => signIn('google')}
            />
            <Button
                outline
                label='Continue with Apple'
                icon={GrApple}
                onClick={() => {}}
            />
            <div className='
                text-neutral-500
                text-center
                text-sm
                w-full
                gap-2
                flex
                flex-row
                justify-center
            '>
                <div >
                    Already have an account?
                </div>
                <button
                    onClick={handleSwitchToLogin}
                    className='
                        text-neutral-700
                        hover:underline
                        focus:outline-none
                    '
                >
                    Login
                </button>
            </div>
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Register"
            actionLabel="Continue"
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default RegisterModal;