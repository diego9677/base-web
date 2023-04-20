import React, { ReactNode } from 'react';

type Props = {
  type: 'submit' | 'button';
  title?: string;
  selected?: boolean;
  disabled?: boolean;
  children?: ReactNode;
  onClick?: () => void;
};

export const Button = ({ type, title, onClick, disabled, children }: Props) => {
  return (
    <button
      type={type}
      title={title}
      className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline text-white font-bold py-2 px-4 rounded-md outline-none"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
