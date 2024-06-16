'use client';

import React, { useState } from "react";
import { Search } from 'lucide-react';


const SearchBar = () => {

    const [search, setSearch] = useState<string>('');
    const [userSelected, setUserSelected] = useState<boolean>(false);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    const handleSelect = () => {
        document.getElementById('search')?.focus();
        setUserSelected(true);
    }

    const handleRelease = () => {
        if (search === '') {
            setUserSelected(false);
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            searchAction();
        }
    }

    const searchAction = () => {
        console.log(`Searching for: ${search}`);
    }
    
    return (
        <div onClick={handleSelect} className={`relative bg-gray-200 rounded-full flex items-center justify-center transition-all h-10 w-10 ${userSelected ? 'w-72' : 'sm:w-52'} `}>
            <input
                type="text"
                id="search"
                onChange={handleSearch}
                onSelect={handleSelect}
                onBlur={handleRelease}
                onKeyDown={handleKeyDown}
                placeholder="Search"
                className="bg-transparent w-full h-full pl-10 py-2 pr-4 text-md focus:outline-none focus:ring-0 focus:border-0"
            />
            <Search strokeWidth={2.3} className="absolute text-gray-500 h-5 w-5 top-1/2 transform -translate-y-1/2 left-[0.6rem] z-10" />
        </div>
    )
}

export default SearchBar;