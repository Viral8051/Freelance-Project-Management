"use client"
import { useTheme } from '@/context/ThemeContext';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function Sidebar() {

    const {isDark, setIsDark} = useTheme();
    const [isActiveMenu, setIsActiveMenu] = useState(false);
    const pathName  = usePathname();

    const linkClass = (path:string) => `duration-300 uppercase font-bold py-2 ${
      pathName === path ? "text-red-500" : "hover:text-red-500"
    }`;

    const menuActive = (e : any) => {
        e.preventDefault();
        if (window.innerWidth < 768) {
            setIsActiveMenu(!isActiveMenu);
        }
    }   

    useEffect(() => {
        const handleResize = () => {
    if (window.innerWidth >= 768) {
      setIsActiveMenu(true); // Sidebar visible on larger screens
    } else {
      setIsActiveMenu(false); // Sidebar hidden on mobile by default
    }
  };

  handleResize(); // Run once on mount

  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
    },[])

  return (
    <>
        <div className="ham-menu absolute top-6 sm:top-8.5 left-2 md:hidden z-51">
                    <button 
                    className={`relative w-8 h-6 flex flex-col justify-between items-center group 
                        ${isActiveMenu ? 'open' : ''}
                        `}
                    onClick={(e) => menuActive(e)}
                    >
                        <span className="block w-[80%] sm:w-full h-[3px] bg-foreground rounded-md transition-all duration-300 ease-in-out group-[.open]:rotate-45 group-[.open]:translate-y-2.5"></span>
                        <span className="block w-[80%] sm:w-full h-[3px] bg-foreground rounded-md transition-all duration-300 ease-in-out group-[.open]:opacity-0"></span>
                        <span className="block w-[80%] sm:w-full h-[3px] bg-foreground rounded-md transition-all duration-300 ease-in-out group-[.open]:-rotate-45 group-[.open]:-translate-y-[11px]"></span>
                    </button>
        </div>
        <div className={`
            Sidebar absolute h-full left-0 flex align-middle justify-center items-center p-5 transform transition-all duration-500 ease-in-out 
            z-50 bg-background md:w-[20%] md:h-full md:fixed
            ${isDark ? 'shadow-[5px_5px_8px_rgba(50,50,50,0.2)]' : 'shadow-[5px_4px_20px_rgba(0,0,0,0.25)]'}
            ${isActiveMenu ? 'translate-x-0' : '-translate-x-full'}
            `}
        >
            <div className="sidebar-inner">
                <ul 
                className={`
                    sidebar-list flex-col justify-center align-middle items-center
                    transform transition-all duration-300 md:flex
                    `}>
                    <li className='sidebar-links text-l font-bold py-2 uppercase'>
                        <Link href="/dashboard" className={linkClass("/dashboard")}>Dashboard</Link>
                    </li>
                    <li className='sidebar-links text-l font-bold py-2 uppercase'>
                        <Link href="/clients" className={linkClass("/clients")}>Clients</Link>
                    </li>
                    <li className='sidebar-links text-l font-bold py-2 uppercase'>
                        <Link href="#" className={linkClass("")}>Add Client</Link>
                    </li>
                </ul>
            </div>
        </div>
    </>
  )
}

export default Sidebar