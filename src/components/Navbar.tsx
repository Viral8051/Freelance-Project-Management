"use client";
import Link from 'next/link'
import Image from 'next/image'
import { MoonStar, Sun } from 'lucide-react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';





function Navbar() {
    const {isDark, setIsDark} = useTheme();

    const toggleDark = (e : any) => {
        e.preventDefault()
        setIsDark(!isDark)
    }
    
  return (
    <>
        <div className="Navbar py-5">
            <div className="containerMain">
                <div className="navbar-main flex justify-center w-full h-auto px-5">
                    <div className="navbar-center flex flex-1/3">

                    </div>
                    <div className="navbar-center flex flex-1/3 justify-right align-middle items-end pr-2 justify-center" >
                        <h2 className='navbar-center-text w-auto text-xl font-bold uppercase sm:text-3xl'>Dashboard</h2>
                    </div>
                    <div className="navbar-right flex justify-end flex-1/3 align-middle items-center">
                        <div className="navbar-theme-toggle flex justify-center align-middle items-center">
                            <button
                            onClick={toggleDark}
                            className="toggle-dark w-12 h-8 px-2 rounded-full mr-2 relative overflow-hidden bg-[var(--togglebg)]"
                            >
                            {/* Sun (light) */}
                            <Sun
                                className={`absolute left-2 top-1/2 transform -translate-y-1/2 transition-all duration-400 ease-in pointer-events-none
                                ${isDark ? 'translate-x-full opacity-0 delay-0' : 'translate-x-0 opacity-100 delay-100'}`}
                                width={18} height={18}
                            />

                            {/* Moon (dark) */}
                            <MoonStar
                                className={`absolute right-2 top-1/2 transform -translate-y-1/2 transition-all duration-400 ease-in pointer-events-none
                                ${isDark ? 'translate-x-0 opacity-100 delay-0' : 'translate-x-100 opacity-0 delay-100'}`}
                                width={18} height={18}
                            />
                            </button>
                        </div>
                        <div className="navbar-avatar">
                            <Link href="#">
                            <Image className="w-8 h-8 sm:w-auto sm:h-auto" src="/images/navbar/navbar-static-avatar.png" alt="navbar-static-avatar.png" width={35} height={35}></Image>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Navbar