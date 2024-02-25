import React from 'react'

function Button({
    children,
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white", className = "", ...props }) {
    return (
        <button
            className={`w-[3.5rem] text-[0.8rem] sm:text-[0.9rem] sm:w-[5rem] rounded-md px-1 py-[0.2rem] ${bgColor} ${textColor} ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button