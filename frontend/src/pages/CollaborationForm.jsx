import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const CATEGORIES = ['Modelo', 'Hotel', 'Maquillaje', 'Localización', 'Otro'];
const STATUSES = ['Contacto inicial', 'Interesado', 'Colaboración activa', 'En pausa'];
const RESPONSIBLES = ['Alicia', 'Marta', 'Alejandro'];


function CollaborationForm() {

    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [form, setForm] = useState({
        brand_name: '', category: '', contact: '', status: '', responsible: '', notes: ''
    });

    // Se ejecuta cada vez que se cambia algun campo del formulario
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    //Se ejecuta al guardar
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.brand_name || !form.contact) {
            setError('El nombre y el contacto no pueden estar vacíos');
            return
        }

        await api.post('/collaborations', form);
        navigate('/collaborations');
    }

    return (
        <div className="max-w-lg mx-auto bg-white rounded-lg shadow p-6">
            <h1 className="text-2xl font-bold mb-6">Nueva colaboración</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input name="brand_name" placeholder="Nombre" onChange={handleChange} className="border rounded px-3 py-2 text-sm" required />
                <select name="category" onChange={handleChange} className="border rounded px-3 py-2 text-sm" required>
                    <option value="">Categoría</option>
                    {CATEGORIES.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
                <input name="contact" placeholder="Contacto" onChange={handleChange} className="border rounded px-3 py-2 text-sm" required />
                <select name="status" onChange={handleChange} className="border rounded px-3 py-2 text-sm" required>
                    <option value="">Estado</option>
                    {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <select name="responsible" onChange={handleChange} className="border rounded px-3 py-2 text-sm" required>
                    <option value="">Responsable</option>
                    {RESPONSIBLES.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
                <input name="notes" placeholder="Notas" onChange={handleChange} className="border rounded px-3 py-2 text-sm" />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button type="submit" className="bg-black text-white py-2 rounded text-sm font-medium hover:bg-gray-800">
                    Guardar
                </button>
            </form>
        </div>
    )
}

export default CollaborationForm
