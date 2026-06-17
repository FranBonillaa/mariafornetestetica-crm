import { Link, NavLink, useNavigate } from 'react-router-dom'

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <nav className="bg-black text-white px-6 py-4 flex items-center justify-between">
            <Link className="font-bold text-lg tracking-widest">MARIAFORNETESTETICA</Link>
            <div className="flex gap-6 text-sm">
                <NavLink
                    to="/clients"
                    className={({ isActive }) => isActive ? 'underline' : 'hover:underline'}
                >
                    Clientes
                </NavLink>
            </div>
            <button onClick={handleLogout} className="text-sm hover:underline">
                Cerrar sesión
            </button>
        </nav>
    )
}

export default Navbar