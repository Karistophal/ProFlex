import { UserRound } from 'lucide-react';



interface AvatarProps {
    image: string | undefined | null;
}

const Avatar: React.FC<AvatarProps> = ({ image }) => {
    return (
        <>
            {image? (
                <img
                    src={image}
                    alt="User Avatar"
                    className="
                        w-9
                        h-9
                        rounded-full
                        object-cover
                        "
                />) : (
                <UserRound size={30} />
            )}
        </>
    );
}

export default Avatar;