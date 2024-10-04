import React from 'react'

interface Props {
    children: React.ReactNode,
    className?: string,
}
const Container = ({children, className}: Props) => {
    return (
        <div className={`${className} max-w-screen-xl mx-auto py-10 md:px-8 px-4`}>{children}</div>
    )
}

export default Container