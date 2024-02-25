import React from 'react'

function Container({ children, className = "" }) {
    return <div className={`max-w-[1340px] m-auto px-4`} > {children}</div>
}

export default Container