import React from 'react'
type ButtonProps = {
    className ?: string;
    children ?: React.ReactNode;
    type?: "button" | "submit" | "reset";
    onClick ?: React.MouseEventHandler<HTMLButtonElement>;
}
function Button({className = "", children, type="button", onClick} : ButtonProps) {
  return (
    <>
            <button 
            type={type} 
            className={`px-4 py-2 rounded-full font-bold
                        transition-all duration-300 ease-in-out hover:text-red-500 ${className}`
                    }
            onClick={onClick}
            >
                {children}
            </button>
    </>
  )
}

export default Button