"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

 


const ThemeContext = createContext<any>(null);

export const ThemeProvider = ({children} : {children : React.ReactNode}) => {

    const [isDark, setIsDark] = useState<boolean | null>(null);


  
    useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        setIsDark(savedTheme === "dark");
    } else {
        setIsDark(false); // default
    }
    }, []);

        useEffect(() => {
        if (isDark === null) return;
        document.documentElement.classList.toggle("dark", isDark);
        localStorage.setItem("theme", isDark ? "dark" : "light");
        }, [isDark]);

            return(
                <ThemeContext.Provider value={{isDark,setIsDark}}>
                    {children}
                </ThemeContext.Provider>
            )

        }

export const useTheme = () => useContext(ThemeContext);