
import MenuItem from "./MenuItem";
import Hr from "../Hr";
import { SafeUser } from "@/app/types";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import useRegisterModal from "../../hook/useRegisterModal";
import useLoginModal from "../../hook/useLoginModal";

interface UserMenuProps {
    currentUser?: SafeUser | null;
    closeUserMenu: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({
    currentUser,
    closeUserMenu
}) => {
    const router = useRouter();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();

    const handleLogout = () => {
        signOut();
    }

    const handleAccount = () => {
        router.push("/account/profil");
    }
        

    return (
        <div onMouseLeave={() => closeUserMenu()} className="absolute z-50 top-12 right-0 w-40 bg-white shadow-lg rounded-lg flex flex-col gap-2 p-4">
            {currentUser ? (
                <>
                    <MenuItem label="Mon compte" onClick={handleAccount} />
                    <Hr />
                    <MenuItem label="Déconnexion" onClick={handleLogout} />
                </>
            ) : (
                <>
                    <MenuItem label="Inscription" onClick={registerModal.onOpen} />
                    <MenuItem label="Connexion" onClick={loginModal.onOpen} />
                </>)}
        </div>
    );
};

export default UserMenu;