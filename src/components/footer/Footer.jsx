import React from 'react'
import Container from '../container/Container'
function Footer() {
    return (
        <Container>
            <footer className='bg-gray-400 py-2 px-1 fixed bottom-0 left-10 right-10'>
                <div className='flex flex-col gap-4 text-[0.8rem] sm:text-[0.9rem] sm:flex-row justify-between text-gray-700'>
                    <ul>
                        <li className='cursor-pointer hover:underline hover:underline-offset-2'>About us</li>
                        <li className='cursor-pointer hover:underline hover:underline-offset-2'>Contact us</li>
                        <li className='cursor-pointer hover:underline hover:underline-offset-2'>Careers</li>
                    </ul>
                    <ul>
                        <li className='cursor-pointer hover:underline hover:underline-offset-2'>Account</li>
                        <li className='cursor-pointer hover:underline hover:underline-offset-2'>Help</li>
                        <li className='cursor-pointer hover:underline hover:underline-offset-2'>FAQ</li>
                    </ul>
                    <ul>
                        <li className='cursor-pointer hover:underline hover:underline-offset-2'>Terms & Conditions</li>
                        <li className='cursor-pointer hover:underline hover:underline-offset-2'>Privacy Policy</li>
                        <li className='cursor-pointer hover:underline hover:underline-offset-2'>Licensing</li>
                    </ul>
                    <ul>
                        <li className='cursor-pointer hover:underline hover:underline-offset-2'>Affiliate Program</li>
                        <li className='cursor-pointer hover:underline hover:underline-offset-2'>Features</li>
                        <li className='cursor-pointer hover:underline hover:underline-offset-2'>Press Kit</li>
                    </ul>
                </div>
                <h2 className='text-center mt-10'>Copywrite 2024</h2>
            </footer>
        </Container>
    )
}

export default Footer