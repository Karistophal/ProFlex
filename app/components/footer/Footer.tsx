'use client';

import { useRouter } from "next/navigation";


const Footer = () => {
    const router = useRouter();

    const handleOpenWindow = () => {
        window.open("https://charles-folio.vercel.app/", '_blank');
    }
    
    return (
        <footer className="bg-gray-800 text-white w-full">
            <div className=" py-8 flex justify-center">
                Site marketplace - Codé et designé par <div className="text-blue-500 ml-1 cursor-pointer" onClick={handleOpenWindow}>Charles Delfau</div>
            </div>
            <div className="">
                <div className="w-full h-[1px] bg-gray-600" onClick={() => router.push("/confidentialite")}>Confidentialité</div>
                <div className="w-full h-[1px] bg-gray-600">Conditions d'utilisation</div>
                <div className="w-full h-[1px] bg-gray-600">Mentions légales</div>
            </div>
        </footer>
    );
}

export default Footer;