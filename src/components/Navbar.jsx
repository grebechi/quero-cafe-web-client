export default function Navbar({ user, onLogout, onMakeCoffee, onRequestCoffee }) {
    return (
        <nav className="flex items-center justify-between bg-white shadow px-6 py-4">
            <h1 className="text-2xl font-semibold text-gray-800">
                Bem-vindo, {user.name}!
            </h1>
            <div className="flex space-x-4">
                {user.isTrainee ? (
                    <button 
                        onClick={onMakeCoffee}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                    >
                        Fazer Café
                    </button>
                ) : (
                    <button 
                        onClick={onRequestCoffee}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                        Pedir Café
                    </button>
                )}
                <button 
                    onClick={onLogout}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}
