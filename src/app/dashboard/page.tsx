"use client"
import { useEffect, useState } from "react";
import Card from "../ui/Card"
import { UserRound,HandCoins,ShieldCheck,ClipboardClock, Key} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Dashboard = () => {
    const chartData = [
        { month: "Jan", earnings: 12000 },
        { month: "Feb", earnings: 14500 },
        { month: "Mar", earnings: 13200 },
        { month: "Apr", earnings: 15800 },
        { month: "May", earnings: 17600 },
        { month: "Jun", earnings: 19200 },
        { month: "Jul", earnings: 20500 },
        { month: "Aug", earnings: 19800 },
        { month: "Sep", earnings: 21200 },
        { month: "Oct", earnings: 22500 },
        { month: "Nov", earnings: 23800 },
        { month: "Dec", earnings: 25100 }
    ]
    const CardData = {
        totalClients: 42,
        activeProjects: 8,
        totalRevenue: 185000,
        pendingTasks: 17
    }

    const [count, setCount] = useState({
        clients : 0,
        projects :0,
        revenue : 0,
        tasks: 0,
    })

    
    useEffect(()=> {
        const animate = (key:string, end:number, duration=1000) => {
            let start =0;
            const step = () => {
                start += end /(duration/16);
                if(start >= end) start = end;
                setCount(prev => ({...prev,[key]: Math.floor(start)}));
                if(start< end) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
        };
        animate("clients", CardData.totalClients);
        animate("revenue", CardData.totalRevenue);
        animate("projects", CardData.activeProjects);
        animate("tasks", CardData.pendingTasks);
    },[])

    return (
        <>
        <section className="dashboard px-3 md:ml-[20%] " id="dashboard">
            <div className="containerMain">
                <div className="dashboard-inner w-full">
                    <div className="dasboard-stats w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
                        <Card title="Total Clients" Icon={UserRound} carddata={count.clients}/>
                        <Card title="Total Revenue" Icon={HandCoins} carddata={count.revenue}/>
                        <Card title="Active Projects" Icon={ShieldCheck} carddata={count.projects}/>
                        <Card title="Pending Tasks" Icon={ClipboardClock} carddata={count.tasks}/>
                    </div>
                    <div className="dashboard-charts mt-20 flex align-middle justify-center items-center">
                        <LineChart
                        style={{ width: '100%', maxWidth: '700px', height: '100%', maxHeight: '70vh', aspectRatio: 1.618 }}
                        responsive  
                        data={chartData}
                        margin={{
                            top: 5,
                            right: 0,
                            left: 0,
                            bottom: 5,
                        }}
                        >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis/>
                        <Tooltip />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="earnings"
                            stroke="#8884d8"
                            strokeWidth={3}
                            dot={{ r: 5 }}
                            activeDot={{ r: 8 }}
                        />
                        </LineChart>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

export default Dashboard