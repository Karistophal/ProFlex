import React from 'react'

export default function ProductLoad() {
    return (
        <div className="w-[calc(50%-0.5rem)] sm:w-52 sm:min-w-52 lg:w-60 sm:h-fit flex flex-col items-center gap-2 cursor-pointer animate-pulse">
            <div className="w-full h-[30svw] sm:h-40 lg:h-48 rounded-lg bg-black bg-opacity-10"></div>
            <div className="w-full flex flex-col flex-1 justify-between">
                {/* Name and price */}
                <div className="flex justify-between">
                    <div className="w-24 h-6 bg-black bg-opacity-10 rounded"></div>
                    <div className="w-16 h-6 bg-black bg-opacity-10 rounded"></div>
                </div>
                <div className="w-full h-6 bg-black bg-opacity-10 rounded mt-2"></div>
            </div>
        </div>
    )
}
