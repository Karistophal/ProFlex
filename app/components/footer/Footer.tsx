'use client';

import { useRouter } from "next/navigation";


const Footer = () => {
    const router = useRouter();

    return (
        <footer className="bg-gray-800 text-white w-full">
            <div className="text-center py-8">
                Site marketplace - Codé et designé par <a href="https://charles-folio.vercel.app/" className="text-blue-500">Charles Delfau</a>
            </div>
        </footer>
    );
}

export default Footer;