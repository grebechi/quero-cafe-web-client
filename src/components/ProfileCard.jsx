import { useNavigate } from 'react-router-dom';

export default function ProfileCard({ user }) {
    const navigate = useNavigate();

    return (
        <div className="w-full max-w-2xl bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Perfil</h2>

            <div className="flex flex-col md:flex-row justify-between gap-4">
                {/* Dados do usuário */}
                <div className="space-y-2 text-sm text-gray-700 flex-1">
                    <div>
                        <span className="font-medium">ID:</span> {user.id}
                    </div>
                    <div>
                        <span className="font-medium">Nome:</span> {user.name}
                    </div>
                    <div>
                        <span className="font-medium">Email:</span> {user.mail}
                    </div>
                    <div>
                        <span className="font-medium">Admin:</span>{' '}
                        <span className={user.isAdmin ? 'text-green-600' : 'text-red-600'}>
                            {user.isAdmin ? 'Sim' : 'Não'}
                        </span>
                    </div>
                    <div>
                        <span className="font-medium">Estagiário:</span>{' '}
                        <span className={user.isTrainee ? 'text-green-600' : 'text-red-600'}>
                            {user.isTrainee ? 'Sim' : 'Não'}
                        </span>
                    </div>
                </div>

                {/* Botões admin */}
                {user.isAdmin && (
                    <div className="space-y-2 flex-1">
                        <button
                            onClick={() => navigate('/admin/users')}
                            className="w-full bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition text-sm"
                        >
                            Gerenciar Usuários
                        </button>
                        <button
                            onClick={() => navigate('/settings/new')}
                            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm"
                        >
                            Nova Configuração
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
