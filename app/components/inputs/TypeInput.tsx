
interface TypeInputInterface {
    name: string;
    onClick?: () => void;
    selected?: boolean;
}

const TypeInput = ({ name, onClick, selected }: TypeInputInterface) => {
    return (
        <div
            className={`text-md px-2 py-1 rounded font-semibold bg-gray-200 border-2 cursor-pointer select-none ${selected ? 'border-blue-500 ' : 'border-gray-200'}`}
            onClick={onClick}
        >
        {name}
        </div>
    );
};

export default TypeInput;