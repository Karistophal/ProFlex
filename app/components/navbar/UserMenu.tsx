
import MenuItem from "./MenuItem";
import Hr from "../Hr";
import { SafeUser } from "@/app/types";
import { signOut } from "next-auth/react";

import useRegisterModal from "../../hook/useRegisterModal";
import useLoginModal from "../../hook/useLoginModal";

interface UserMenuProps {
    currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({
    currentUser
}) => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();

    const handleLogout = () => {
        signOut();
    }
        

    return (
        <div className="
        absolute
        top-12
        right-0
        w-40
        bg-white
        shadow-lg
        rounded-lg
        flex
        flex-col
        gap-2
        p-4
    ">
            {currentUser ? (
                <>
                    <MenuItem label="Profile" onClick={() => {}} />
                    <Hr />
                    <MenuItem label="Logout" onClick={handleLogout} />
                </>
            ) : (
                <>
                    <MenuItem label="Register" onClick={registerModal.onOpen} />
                    <MenuItem label="Login" onClick={loginModal.onOpen} />
                </>)}
        </div>
    );
};

export default UserMenu;