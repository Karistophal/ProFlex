'use client';

import axios from 'axios';
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { GrApple } from "react-icons/gr";
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';


import useRegisterModal from '../../hook/useRegisterModal';
import useLoginModal from '../../hook/useLoginModal';
import { useRouter } from 'next/navigation';

import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import Button from '../Button';



const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const router = useRouter();

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
                signIn('credentials', {
                    ...data,
                    redirect: false
                })
                .then((callback) => {
                    setIsLoading(false);
        
                    if (callback?.ok) {
                        toast.success('Compte créé avec succès.');
                        router.refresh();
                        registerModal.onClose();
                    }
                    else {
                        toast.error('Erreur lors de la connexion');
                    }
                })
            })
            .catch((error) => {
                toast.error("Erreur lors de la création du compte.");
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    const toggle = () => {
        registerModal.onClose();
        loginModal.onOpen();
    }


    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading title='Inscription' subtitle='Créer un compte et commencez vos achats' />
            <Input
                id='name'
                label='Nom'
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
                label='Mot de passe'
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
                label='Continuer avec Google'
                icon={FcGoogle}
                onClick={() => signIn('google')}
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
                    onClick={toggle}
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
            actionLabel="S'inscrire"
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default RegisterModal;