import React, { useId } from 'react'


const Input = React.forwardRef(
    function Input({ label, type = "text", className = "", ...props }, ref) {
        const id = useId();
        return (
            <div className='flex flex-col max-w-[20rem]'>
                <div className='text-center'>
                    {
                        label && <label className='text-[1.03rem]'
                            htmlFor={id}>
                            {label}
                        </label>
                    }
                </div>
                <input
                    type={type}
                    className={`outline-none mt-1 p-2 rounded-md ${className}`}
                    ref={ref}
                    id={id}
                    {...props}
                />
            </div>
        )
    }
);

export default Input;
