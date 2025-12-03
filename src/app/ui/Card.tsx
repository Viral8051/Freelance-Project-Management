"use client"
import { LucideIcon  } from 'lucide-react';

type CardProps = {
    className?: string;
    title: string;
    Icon?: LucideIcon;
    carddata?: number;
}
const Card = ( {className = " ",Icon, title, carddata } : CardProps) => {
    return (
        <>
            <div className={`Card flex flex-col align-middle justify-center items-center h-[200px]
                shadow-2xl ${className}`}>
                <div className="card-head flex flex-row align-middle justify-center items-center">
                    <div className="card-icon ">
                        {Icon ? <Icon className={`p-2 w-10 h-10 rounded-4xl bg-togglebg`}/> : null}
                    </div>
                    <h2 className='text-xl font-bold'>{title}</h2>
                </div>
                <div className={`card-numbers ${className}`}>
                    <p className='text-4xl'>{carddata ? carddata : null} </p>
                </div>
            </div>
        </>
    )

}

export default Card