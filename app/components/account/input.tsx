'use client';

interface InputProps {
  label: string;
  disabled: boolean;
  onClick?: () => void
}

const Input: React.FC<InputProps> = ({
  label,
  disabled,
  onClick
}) => {
  return (
    <div className="
            w-full
            relative
        ">
      <input
        disabled={disabled}
        type="text"
        value={label}
        className={`min-w-200 p-2 border-2 border-gray-300 rounded-md ${disabled ? 'text-gray-400' : 'bg-white'}
      `}
      />
    </div>
  );
}

export default Input;