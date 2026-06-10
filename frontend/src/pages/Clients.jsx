import { useEffect, useState } from 'react'
import api from '../services/api'

function Clients() {
    const [clients, setClients] = useState([])

    useEffect(() => {
        api.get('/clients').then(({ data }) => setClients(data))
    }, [])

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Clientes</h1>
            <table className="w-full bg-white rounded-lg shadow text-sm">
                <thead className="bg-black text-white">
                    <tr>
                        <th className="px-4 py-3 text-left">Nombre</th>
                        <th className="px-4 py-3 text-left">Contacto</th>
                        <th className="px-4 py-3 text-left">Modalidad</th>
                        <th className="px-4 py-3 text-left">Estado</th>
                        <th className="px-4 py-3 text-left">Responsable</th>
                        <th className="px-4 py-3 text-left">Importe</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map((client) => (
                        <tr key={client.id} className="border-t">
                            <td className="px-4 py-3">{client.name}</td>
                            <td className="px-4 py-3">{client.contact}</td>
                            <td className="px-4 py-3">{client.modality}</td>
                            <td className="px-4 py-3">{client.status}</td>
                            <td className="px-4 py-3">{client.responsible}</td>
                            <td className="px-4 py-3">{client.amount ?? '—'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Clients
