'use client';

const Footer = () => {

    const handleOpenWindow = () => {
        window.open("https://charles-folio.vercel.app/", '_blank');
    }
    
    return (
        <footer className="bg-gray-800 text-white w-full">
            <div className="w-full py-8 flex justify-center items-center flex-col sm:flex-row ">
                - Site marketplace - <div className="flex flex-row sm:pl-1">Codé et designé par <div className="text-blue-500 ml-1 cursor-pointer" onClick={handleOpenWindow}>Charles Delfau</div></div>
            </div>
        </footer>
    );
}

export default Footer;