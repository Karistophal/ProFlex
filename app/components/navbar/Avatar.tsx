import { UserRound } from 'lucide-react';
import Image from 'next/image';



interface AvatarProps {
    image: string | undefined | null;
}

const Avatar: React.FC<AvatarProps> = ({ image }) => {
    return (
        <>
            {image ? (
                <Image
                    src={image}
                    alt="User Avatar"
                    width={36}
                    height={36} 
                    className="rounded-full object-cover"
                />
            ) : (
                <UserRound size={30} />
            )}
        </>
    );
}

export default Avatar;