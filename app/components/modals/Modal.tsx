'use client';

import React, { useCallback, useEffect, useState } from "react";
import { X } from "lucide-react";
import Button from "../Button";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: React.ReactNode;
    footer?: React.ReactNode;
    actionLabel: string;
    disabled?: boolean;
    secondaryAction?: () => void;
    secondaryLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionLabel,
    disabled,
    secondaryAction,
    secondaryLabel
}) => {
    const [showModal, setShowModal] = useState(isOpen);

    useEffect(() => {
        setShowModal(isOpen);
        
    }, [isOpen]);

    const handleClose = useCallback(() => {
        if (disabled) return;

        setShowModal(false);
        setTimeout(() => {
            onClose()
        }, 300);
    }, [disabled, onClose]);

    const handleSubmit = useCallback(() => {
        if (disabled) return;

        onSubmit();
    }, [disabled, onSubmit]);

    const handleSecondaryAction = useCallback(() => {
        if (disabled || !secondaryAction) return;

        secondaryAction();
    }, [disabled, secondaryAction]);

    if (!isOpen) return null;

    return (
        <>
            {/* Modal */}
                <div
                    className={`
                        fixed
                        flex
                        items-center
                        justify-center
                        inset-0
                        z-50
                        bg-neutral-800/70
                        overflow-y-auto
                        overflow-x-hidden
                        transition-opacity
                        duration-300
                        ${showModal ? 'opacity-100' : 'opacity-0'}
                    `}
                >
                    <div className={`
                        w-full
                        md:w-1/2
                        lg:w-3/6
                        xl:w-2/5
                        max-w-lg
                        h-full
                        lg:h-auto
                        md:h-auto
                        bg-white
                        rounded-lg
                        shadow-lg
                        relative
                        p-6
                        translate
                        duration-300
                        ${showModal ? 'translate-y-0' : 'translate-y-full'}
                    `}>

                        {/* Header */}
                        <div className="
                            relative
                            flex
                            justify-center
                            pb-4
                            border-b-[1px]
                        ">
                            <h2 className="text-lg font-semibold">
                                {title}
                            </h2>
                            <button
                                onClick={handleClose}
                                className="
                                    absolute
                                    right-0
                                    text-neutral-500
                                    hover:text-neutral-600
                                    focus:outline-none
                                "
                            >
                                <X />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="relative py-6 flex-auto">
                            {body}
                        </div>

                        <div className="
                            flex
                            flex-col
                            items-center
                            justify-center
                            gap-2
                            mb-6
                        ">
                            <div className="
                                flex
                                flex-row
                                items-center
                                gap-4
                                w-full
                            ">
                                {secondaryAction && secondaryLabel && (
                                    <Button outline disabled={disabled} label={secondaryLabel} onClick={handleSecondaryAction} />
                                )}
                                <Button disabled={disabled} label={actionLabel} onClick={handleSubmit} />
                            </div>
                        </div>

                        {/* Footer */}
                        {footer && (
                            <div className="
                            relative
                            pt-3
                            border-t-[1px]
                        ">
                                {footer}
                            </div>
                        )}
                    </div>
                </div>

        </>
    );
}

export default Modal;