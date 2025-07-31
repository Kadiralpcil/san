import React, { ButtonHTMLAttributes, FC } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "link";
}

const Button: FC<ButtonProps> = ({
  children,
  className,
  variant = "primary",
  ...props
}) => {
  const baseClasses =
    "cursor-pointer inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold focus:outline-none  transition-colors duration-200";

  const variantClasses = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300",
    link: "bg-transparent text-blue-400 hover:underline p-0",
  };

  const combinedClasses = [baseClasses, variantClasses[variant], className]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
