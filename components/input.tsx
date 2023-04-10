import React from 'react';

interface InputProps {
  type?: string;
  id: string;
  value: string;
  label: string;
  onChange?: (ev: { target: { value: React.SetStateAction<string>; }; }) => void
}

const Input: React.FC<InputProps> = ({ type, id, value, label, onChange }) => {
  return (
    <div className="relative">
      <input
        type={type}
        id={id}
        className="block w-full text-white bg-neutral-700 rounded-md px-6 pt-6 pb-1 appearance-none peer  focus:outline-none focus:ring-0"
        value={value}
        placeholder=" "
        onChange={onChange}
      />
      <label htmlFor={id} className=" absolute text-md text-zinc-400 duration-150 transfrom -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-3">{label}</label>
    </div>
  )
}

export default Input;