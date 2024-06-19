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
                toast.success('Connecté avec succès');
                router.refresh();
                LoginModal.onClose();
            }
            else {
                toast.error('Erreur lors de la connexion');
            }
        
        })
    }

    const toggle = () => {
        LoginModal.onClose();
        RegisterModal.onOpen();
    }



    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading title='Heureux de vous revoir !' subtitle='Connectez-vous pour continuer' />
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
                    Vous n'avez pas de compte ?
                </div>
                <button
                    onClick={toggle}
                    className='
                        text-neutral-700
                        hover:underline
                        focus:outline-none
                    '
                >
                    S'inscrire
                </button>
            </div>
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={LoginModal.isOpen}
            title="Connexion"
            actionLabel="Se connecter"
            onClose={LoginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default LoginModal;