'use client';

import { Search } from 'lucide-react';


const SearchBar = () => {

    const caca = () => {
        console.log("caca")
    }

    return (
        <div className="
        relative
        bg-gray-200
        w-40
        rounded-full
        flex
        items-center
        justify-center
        lg:w-52
    ">
        <input type="text" onKeyDown={caca} placeholder="Search" className="
            bg-transparent
            w-full
            h-full
            pl-10
            py-2
            pr-4
            text-sm
            focus:outline-none
            focus:ring-0
            focus:border-0
        " />
        <Search className="
            absolute
            text-gray-500
            h-5
            w-5
            top-1/2
            transform
            -translate-y-1/2
            left-2
            z-10
        " />
    </div>
    )
}

export default SearchBar;