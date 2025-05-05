"use client";

import React, { useEffect } from "react";

const Alert = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 2000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="w-full flex justify-center fixed mt-8 mo:mt-32 animate-slide-down z-50">
            <div className="w-fit h-fit border-2 border-purple-700 flex justify-center items-center rounded-3xl p-[3px]">
                <div className="bg-purple-500 w-full h-full rounded-3xl flex justify-center items-center">
                    <p className="font-semibold text-white px-4 py-2">{message}</p>
                </div>
            </div>
        </div>
    );
};

export default Alert;
