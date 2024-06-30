'use client';

const Footer = () => {

    const handleOpenWindow = () => {
        window.open("https://charles-folio.vercel.app/", '_blank');
    }
    
    return (
        <footer className="bg-gray-800 text-white w-full">
            <div className=" py-8 flex justify-center">
                Site marketplace - Codé et designé par <div className="text-blue-500 ml-1 cursor-pointer" onClick={handleOpenWindow}>Charles Delfau</div>
            </div>
        </footer>
    );
}

export default Footer;