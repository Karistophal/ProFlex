import { UserRound } from 'lucide-react';
import Image from 'next/image';



interface AvatarProps {
    image: string | undefined | null;
}

const Avatar: React.FC<AvatarProps> = ({ image }) => {
    return (
        <>
            {image? (
                <Image
                    src={image}
                    alt=""
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