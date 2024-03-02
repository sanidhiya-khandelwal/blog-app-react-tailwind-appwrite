import React from 'react'
import './Footer.css'
function Footer() {
    return (
        <footer className='custom-shadow mt-[6rem] sm:mt-[2.6rem] py-7 px-5'>
            <div className='flex flex-row flex-wrap gap-4 text-[0.8rem] sm:text-[0.9rem] justify-between text-slate-600'>
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
            <h2 className='text-center mt-10 font-bold text-[0.9rem]'>Copywrite 2024</h2>
        </footer>
        // </Container >
    )
}

export default Footer