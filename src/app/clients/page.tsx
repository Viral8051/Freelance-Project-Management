"use client";
import { Client } from "@/data/clients";
import { Search, X , Trash, Pencil } from 'lucide-react';
import { useEffect, useState } from "react";
import { useTheme } from '@/context/ThemeContext';
import Button from "../ui/Button";


const Clients = () => {
    const {isDark, setIsDark} = useTheme();
    const [searchInput, setSearchInput] = useState("");
    const [filteredClients, setFilteredCllients] = useState<Client[]>([]);
    const [allClients, setAllClients] = useState<Client[]>([]);
    const [status, setStatus] = useState("all");
    const [modal, setModal] = useState(false);
    const [clientName, setClientName] = useState("");
    const [clientEmail, setClientEmail] = useState("");
    const [clientProject, setClientProject] = useState("");
    const [clientBudget, setClientBudget] = useState<number>(0);
    const [clientStatus, setClientStatus] = useState("active");
    const [dateValue, setDateValue] = useState(new Date().toISOString().split("T")[0]);
    const [edited, setEdited] = useState(false);
    const [currentClient, setCurrentClient] = useState<Client | null>(null);


    const modalOpen  = () => setModal(true)
    const modalClose  = () => setModal(false)
    const modalEdit  = (id:number) => {
        setModal(true);
        const findClient: Client[] = JSON.parse(localStorage.getItem("clients") ?? "[]");
        const clientToEdit  = findClient.find((c: Client) => c.id == id ) || null;
        setCurrentClient(clientToEdit);
        console.log(clientToEdit)
        setEdited(true);
    }



    const handleSubmit = (e: any) => {
    e.preventDefault();
    setClientName("");
    setClientEmail("");
    setClientProject("");
    setClientBudget(Number(0));
    setClientStatus("active");
    setDateValue(new Date().toISOString().split("T")[0]);

    const newClient = {
        id: Date.now(),
        name: clientName,
        email: clientEmail,
        project: clientProject,
        budget: clientBudget,
        status: clientStatus,
        date: dateValue,
    };

    const existing = JSON.parse(localStorage.getItem("clients") ?? "[]");
    const updated = [...existing, newClient];

    localStorage.setItem("clients", JSON.stringify(updated));
    setAllClients(updated)

    // Modal close
    setModal(false);

    // Form reset
    setClientName("");
    setClientEmail("");
    setClientProject("");
    setClientBudget(Number);
    setClientStatus("active");
    setDateValue(new Date().toISOString().split("T")[0]);
    };

    const handleEdit = (e:any) => {
        e.preventDefault();
        const stored: Client[] = JSON.parse(localStorage.getItem("clients") ?? "[]");

        const updated = stored.map((c)=> {
            if(c.id === currentClient?.id){
                return{
                    ...c,
                    name:clientName,
                    email:clientEmail,
                    project: clientProject,
                    budget:clientBudget,
                    status:clientStatus,
                    date: dateValue,
                }
            }
            return c;
        })

        localStorage.setItem( "clients", JSON.stringify(updated));
        setAllClients(updated)
        setModal(false);
        setEdited(false)
        
    }

    const handleDelete = (id:number) => {
        const filteredId =  allClients.filter((c) => c.id !== id);
        setAllClients(filteredId);
        localStorage.setItem("clients", JSON.stringify(filteredId))
    }

    useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("clients") ?? "[]");
    setAllClients(saved);
    }, []);

    useEffect(() => {
        let filtered = allClients;

        if(searchInput.trim() !== "") {
            filtered = filtered.filter((client) => 
                client.name.toLowerCase().includes(searchInput.toLowerCase()) ||
                client.project.toLowerCase().includes(searchInput.toLowerCase())
            )
        }

        if(status !== "all"){
            filtered = filtered.filter((clients) => 
                clients.status.toLowerCase() === status.toLowerCase()
            );
        }
        
        setFilteredCllients(filtered)
    },[searchInput,status, allClients])
    
    useEffect(() => {
        if(currentClient) {
            setClientName(currentClient.name);
            setClientEmail(currentClient.email);
            setClientProject(currentClient.project);
            setClientBudget(currentClient.budget);
            setClientStatus(currentClient.status);
            setDateValue(currentClient.date);
        }
    }, [currentClient]);

    return (
        <>
        <section className="Clients px-3 md:ml-[20%]" id="clients">
            <div className="containerMain">
                <div className="clients-inner w-full relative">
                    <div className="clients-head w-full flex flex-row align-middle justify-center items-center">
                        <div className="client-head-title w-full flex justify-start flex-1/3 mdflex-2/3 md:justify-center">
                            <h2 className="text-2xl font-bold uppercase"> Clients</h2>
                        </div>
                        <div className="client-head-add w-full flex justify-end flex-1/3">
                            <button className="client-add-button bg-togglebg px-4 py-2 rounded-full font-bold
                            transition-all duration-300 ease-in-out hover:text-red-500"
                            onClick={() => modalOpen()}
                            >
                                    Add Client
                            </button>
                        </div>
                        <div className="clients-search ml-2 relative">
                            <div className="client-search-input">
                                <input 
                                type="text" 
                                name="client-search" 
                                id="client-search" 
                                value={searchInput}
                                onChange={(e) => {
                                    setSearchInput(e.target.value);
                                    
                                }}
                                className="bg-togglebg rounded-full p-2 focus-within:outline-0"/>
                            </div>  
                            <button 
                                className="client-search-button absolute top-0 right-0 bg-background
                                rounded-full p-2 transition-all duration-700 hover:scale-110 hover:text-red-500"
                                
                            >   
                                <Search/>
                            </button>
                        </div>
                    </div>
                    <div className="clients-table-inner flex justify-center align-middle items-center mt-10">
                        <table className="clients-table w-full">
                            <thead className="bg-togglebg">
                                <tr className="divide-x divide-background">
                                    <th>Client Name</th>
                                    <th>Email</th>
                                    <th>Project</th>
                                    <th>Budget</th>
                                    <th>
                                        <select name="Status" 
                                        className=" focus-within:outline-0 text-center" 
                                        id="status"
                                        onChange={(e) => setStatus(e.target.value)}
                                        >
                                            <option value="all">All</option>
                                            <option value="active">Active</option>
                                            <option value="completed">Completed</option>
                                            <option value="pending">Pending</option>
                                        </select>
                                    </th>
                                    <th>Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filteredClients.map((client) =>(
                                        <tr key={client.id} className="">
                                            <td className="text-center py-2">{client.name}</td>
                                            <td className="text-center py-2">{client.email}</td>
                                            <td className="text-center py-2">{client.project}</td>
                                            <td className="text-center py-2">{client.budget}</td>
                                            <td className="text-center py-2">{client.status}</td>
                                            <td className="text-center py-2">{client.date}</td>
                                            <td className="text-center py-2">
                                                <div className="actionbuttons">
                                                    <Button 
                                                    className=""
                                                    onClick={() => modalEdit(client.id)}
                                                    >
                                                        <Pencil size={17}/></Button>
                                                    <Button 
                                                    className=""
                                                    onClick={(id) => handleDelete(client.id)}
                                                    ><Trash size={17}/></Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    {modal && (
                    <div className={`add-client-modal absolute px-5 py-5 bg-background left-15 top-25 rounded-2xl w-[80%]
                                    ${isDark ? 'shadow-[0px_0px_15px_rgba(50,50,50,0.2)]' : 'shadow-[0px_0px_20px_rgba(0,0,0,0.25)]'}
                                    md:px-20 md:py-10 md:w-[50%] md:left-50
                                    `}>
                        <div className="add-client-form">
                            <form 
                            className="flex flex-col w-full" 
                            onSubmit={(e) => edited ? handleEdit(e) : handleSubmit(e)}
                            >
                                <div className="client-form-name flex items-center my-2">
                                    <label htmlFor="clientName" className="pr-2">Name:</label>
                                    <input 
                                    className="bg-togglebg rounded-full p-2 w-full" 
                                    type="text"  
                                    id="clientName" 
                                    placeholder="Client Name"
                                    value={clientName}
                                    onChange={(e) => setClientName(e.target.value)}
                                    />
                                </div>
                                <div className="client-form-email flex items-center my-2">
                                    <label htmlFor="clientEmail" className="pr-2">Email:</label>
                                    <input 
                                    className="w-full bg-togglebg rounded-full p-2 " 
                                    type="email" 
                                    name="" 
                                    id="clientEmail" 
                                    placeholder="Client Email"
                                    value={clientEmail}
                                    onChange={(e) => setClientEmail(e.target.value)}
                                    />
                                </div>
                                <div className="client-form-project flex items-center my-2">
                                    <label htmlFor="clientProject" className="pr-2">Project:</label>
                                    <input 
                                    className="w-full bg-togglebg rounded-full p-2" 
                                    type="text" 
                                    id="clientProject" 
                                    placeholder="Client's Project"
                                    value={clientProject}
                                    onChange={(e) => setClientProject(e.target.value)}
                                    />
                                </div>
                                <div className="client-form-Budget flex items-center my-2">
                                    <label htmlFor="clientBudget" className="pr-2">Budget:</label>
                                    <input 
                                    className="w-full bg-togglebg rounded-full p-2" 
                                    type="number" 
                                    id="clientBudget" 
                                    placeholder="Client's Buget"
                                    min={0} 
                                    max={100000}
                                    value={clientBudget}
                                    onChange={(e) => setClientBudget(Number(e.target.value))}
                                    />
                                </div>
                                <div className="client-form-status flex items-center my-2">
                                    <label htmlFor="clientStatus" className="pr-2">Status:</label>
                                    <select 
                                    name="" 
                                    id="clientStatus" 
                                    className="focus-within:outline-0 bg-togglebg p-2 rounded-full "
                                    value={clientStatus}
                                    onChange={(e) => setClientStatus(e.target.value)}
                                    >
                                        <option value="active">Active</option>
                                        <option value="pending">Pending</option>
                                        <option value="compeleted">Compeleted</option>
                                    </select>
                                </div>
                                <div className="client-form-date flex items-center my-2">
                                    <label htmlFor="clientDate" className="pr-2">Status:</label>
                                    <input 
                                    type="date" 
                                    id="clientdate" 
                                    className="focus-within:outline-0 bg-togglebg p-2 rounded-full "
                                    value={dateValue}
                                    onChange={(e) => setDateValue(e.target.value)}
                                    />
                                </div>
                                <div className="formSubmit text-center mt-5">
                                    <Button className="" children="Submit" type="submit"/>
                                </div>
                            </form>
                        </div>
                        <button 
                            className="close absolute top-2 right-3 rounded-full text-xl font-bold
                            transition-all duration-300 ease-in-out hover:text-red-500"
                            onClick={() => modalClose()}
                        >
                        <X/>
                        </button>
                    </div>
                    )}
                </div>
            </div>
        </section>
        </>
    )
}

export default Clients