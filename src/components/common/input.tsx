import React, { useState } from 'react';

// type TypeValue =
//   | { type: 'text' | 'email' | 'password' | 'time'; value?: string; }
//   | { type: 'number', value?: number; };

type Props = {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  id?: string;
  placeholder?: string;
  label?: string;
  error?: string;
  autoComplete?: string;
  step?: string | number;
  value?: string | number;
  type: React.HTMLInputTypeAttribute;
};

export const Input = ({ id, placeholder, label, error, autoComplete, step, type, value, onChange }: Props) => {
  const [show, setShow] = useState(false);


  const setType = () => {
    if (type === 'password') {
      return show ? 'text' : 'password';
    } else {
      return type;
    }
  };

  return (
    <section className="flex flex-col gap-1">
      {label && <label className="text-sm font-semibold text-gray-800" htmlFor={id}>{label}</label>}
      <div className="relative flex items-center">
        <input
          id={id}
          className="text-base bg-white ring-1 ring-gray-200 rounded-md w-full py-2 px-4 text-gray-700 leading-tight outline-none focus:ring-2 focus:ring-blue-500"
          type={setType()}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          step={step}
        />
        {type === 'password' &&
          <span className="absolute right-2 cursor-pointer p-1 rounded-full hover:bg-gray-200" onClick={() => setShow(!show)}>
            {show ? <i className="las la-lg la-eye-slash" /> : <i className="las la-lg la-eye" />}
          </span>
        }
      </div>
      {error && (
        <span>{error}</span>
      )}
    </section>
  );
};
