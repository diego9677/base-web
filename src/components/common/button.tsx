import clsx from "clsx";
import React, { ReactNode } from 'react';

type Props = {
  type: "button" | "reset" | "submit";
  title?: string;
  selected?: boolean;
  disabled?: boolean;
  children?: ReactNode;
  onClick?: () => void;
  color?: "primary" | "secondary" | "danger" | "success";
};

const COLORS = {
  "primary": "bg-blue-500 text-white",
  "secondary": "bg-gray-500 text-white",
  "danger": "bg-red-500 text-white",
  "success": "bg-green-600 text-white",
};

export const Button = ({ type, title, onClick, disabled, children, color = "primary" }: Props) => {
  return (
    <button
      type={type}
      title={title}
      className={clsx("w-full shadow font-bold p-2 rounded-md outline-none hover:bg-opacity-70", COLORS[color])}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
