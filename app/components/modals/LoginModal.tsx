'use client';

import { signIn } from 'next-auth/react';
import { useCallback, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { GrApple } from "react-icons/gr";
import toast from 'react-hot-toast';

import useLoginModal from '../../hook/useLoginModal';
import useRegisterModal from '../../hook/useRegisterModal';

import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import Button from '../Button';



const LoginModal = () => {
    const router = useRouter();
    const RegisterModal = useRegisterModal();
    const LoginModal = useLoginModal();

    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        signIn('credentials', {
            ...data,
            redirect: false
        })
        .then((callback) => {
            setIsLoading(false);

            if (callback?.ok) {
                toast.success('Logged in successfully');
                router.refresh();
                LoginModal.onClose();
            }
            else {
                toast.error('User not found');
            }
        
        })
    }

    const handleSwitchToRegister = () => {
        LoginModal.onClose();
        RegisterModal.onOpen();
    }



    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading title='Welcome back' subtitle='Login to your account !' />
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
                onClick={() => signIn('apple')}
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
                    Don't have an account?
                </div>
                <button
                    onClick={handleSwitchToRegister}
                    className='
                        text-neutral-700
                        hover:underline
                        focus:outline-none
                    '
                >
                    Register
                </button>
            </div>
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={LoginModal.isOpen}
            title="Login"
            actionLabel="Login"
            onClose={LoginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default LoginModal;