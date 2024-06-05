import React from "react";

type ButtonProps = {
  variant?: "primary" | "secondary" | "tertiary" | "quaternary";
  children: React.ReactNode;
}  & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ variant = "primary", children, ...props }: ButtonProps) => {
  let baseClasses = "bg-violet-600 text-white px-6 py-2 rounded-full font-bold";
  let variantClasses;

  switch (variant) {
    case "secondary":
      variantClasses =
        "bg-violet-600 text-violet-600 px-6 py-2 rounded-full font-bold hover:bg-violet-500 hover:text-white transition";
      break;

    case "tertiary":
      variantClasses =
        "bg-transparent text-white px-6 py-2 rounded-full font-bold hover:text-violet-500 transition";
      break;

    case "quaternary":
      variantClasses =
        "className=w-96 rounded-lg outline outline-2 outline-[#7c3aed] border-0 font-sans bg-violet-700 hover:outline-offset-[3px] p-[10px] px-4 transition hover:outline-offset-[5px] hover:bg-violet-700";
      break;

    case "primary":
    default:
      variantClasses =
        "bg-violet-600 text-white px-6 py-2 rounded-full font-bold hover:bg-violet-500 transition";
      break;
  }

  return (
    <button className={`${baseClasses} ${variantClasses}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
