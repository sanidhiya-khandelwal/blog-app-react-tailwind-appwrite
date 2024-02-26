import React, { forwardRef, useId } from 'react'

function Select({
    className = "",
    options,
    label,
    ...props
}, ref) {
    const id = useId();

    return <div className='flex flex-col gap-1'>
        {label && <label htmlFor={id} className='font-semibold'>{label}</label>}
        <select className={`border border-black bg-black text-white p-1 rounded-md w-[10rem] outline-none cursor-pointer ${className}`}
            {...props}
            id={id}
            ref={ref}>
            {
                options?.map((option) => (
                    <option key={option} value={option} className=''>{option}</option>
                )
                )
            }
        </select>
    </div>
}
export default forwardRef(Select)