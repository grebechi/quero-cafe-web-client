export default function ProfileCard({ user }) {
    return (
        <aside className="w-64 bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Perfil</h2>
            <div className="space-y-2">
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
        </aside>
    );
}
