import React,{
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  ReactNode,
} from "react";


const sizeClassnames = {
  big: "py-2 px-6 text-sm rounded-lg",
  small: "px-2 py-1 text-sm rounded-md",
  tiny: "px-1 text-sm rounded-5",
};

const colorClassnames = {
  primary:
    "text-button bg-accent transition duration-200 ease-in-out hover:bg-accent-hover disabled:text-accent-disabled disabled:bg-accent-hover",
  secondary:
    "text-button bg-primary-700 hover:bg-primary-600 disabled:text-primary-300",
  "secondary-800":
    "text-button bg-primary-800 hover:bg-primary-600 disabled:text-primary-300",
  "primary-300":
    "text-button bg-primary-700 hover:bg-primary-600 disabled:text-primary-300",
  transparent: "text-button bg-transparent",
  "accent-secondary":
    "text-button bg-secondary hover:bg-secondary-washed-out disabled:text-secondary-washed-out",
};

export type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  size?: keyof typeof sizeClassnames;
  color?: keyof typeof colorClassnames;
  loading?: boolean;
  icon?: ReactNode;
  transition?: boolean;
};


export const  Button: React.FC<ButtonProps> =(
    {value, type,
        disabled,loading,
        onClick,
        className,
        color ="primary",size="big",
         transition,...props}) =>{

    return(
    <div >
        <button
         className={`flex outline-none focus:ring-4 focus:ring-${color} ${sizeClassnames[size]
        } ${transition ? `transition duration-200 ease-in-out` : ``} ${colorClassnames[color]
        } font-bold flex items-center justify-center ${className}`}
         onClick={onClick} type={type} 
         disabled={disabled || loading} {...props}>
             {value}
             </button>
    </div>)
}


