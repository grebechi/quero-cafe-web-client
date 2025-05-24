import { useEffect, useState } from 'react';
import { apiFetch, createUser } from '../api/client';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Pencil, Trash2, Save, X } from 'lucide-react';

export default function UserManagement() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [newUser, setNewUser] = useState({
    name: '',
    mail: '',
    pass: '',
    isTrainee: false,
    isAdmin: false
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.isAdmin) {
      fetchUsers();
    } else {
      navigate('/dashboard');
    }
  }, [user]);

  async function fetchUsers() {
    try {
      const data = await apiFetch('/people');
      setUsers(data);
    } catch (err) {
      toast.error('Erro ao carregar usuários');
    }
  }

  async function handleDelete(id) {
    if (!confirm('Tem certeza que deseja excluir este usuário?')) return;
    try {
      await apiFetch(`/people/${id}`, { method: 'DELETE' });
      toast.success('Usuário removido');
      fetchUsers();
    } catch (err) {
      toast.error('Erro ao remover usuário');
    }
  }

  async function handleUpdate(id) {
    try {
      await apiFetch(`/people/${id}`, {
        method: 'PUT',
        body: JSON.stringify(form[id]),
        headers: { 'Content-Type': 'application/json' }
      });
      toast.success('Usuário atualizado');
      fetchUsers();
      setEditingId(null);
    } catch (err) {
      toast.error('Erro ao atualizar usuário');
    }
  }
  async function handleCreate() {
    const userData = {
        name: newUser.name,
        mail: newUser.mail,
        pass: newUser.pass,
        isTrainee: newUser.isTrainee,
        isAdmin: newUser.isAdmin
    };

    console.log('📝 Dados para criação de usuário:', userData);

    // Validação básica
    if (!userData.name || !userData.mail || !userData.pass) {
        toast.error('Por favor, preencha nome, email e senha.');
        console.warn('⚠️ Dados inválidos:', userData);
        return;
    }

    try {
        const result = await createUser(userData);
        console.log('✅ Usuário criado:', result);

        toast.success('Usuário criado com sucesso!');
        fetchUsers();
        setNewUser({ name: '', mail: '', pass: '', isTrainee: false, isAdmin: false });  // limpa formulário
    } catch (err) {
        console.error('❌ Erro ao criar usuário:', err);
        toast.error(err.message || 'Erro ao criar usuário');
    }
}



  function handleInputChange(id, field, value) {
    setForm(prev => ({
      ...prev,
      [id]: { ...prev[id], [field]: value }
    }));
  }

  return (
    <section className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Gerenciar Usuários</h1>

      <div
        onClick={() => navigate('/dashboard')}
        className="mb-4 inline-block px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 cursor-pointer"
        title="Voltar para Dashboard"
      >
        Voltar para Dashboard
      </div>

      <div className="mb-6 border p-4 rounded bg-white shadow">
        <h2 className="font-semibold mb-2">Novo Usuário</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm">Nome</label>
            <input
              value={newUser.name}
              onChange={e => setNewUser({ ...newUser, name: e.target.value })}
              className="border p-1 w-full rounded"
            />
          </div>
          <div>
            <label className="block text-sm">Email</label>
            <input
              value={newUser.mail}
              onChange={e => setNewUser({ ...newUser, mail: e.target.value })}
              className="border p-1 w-full rounded"
            />
          </div>
          <div>
            <label className="block text-sm">Senha</label>
            <input
              value={newUser.pass}
              onChange={e => setNewUser({ ...newUser, pass: e.target.value })}
              className="border p-1 w-full rounded"
              type="password"
            />
          </div>
            <div className="flex items-center space-x-4">
                <input
                    id="isTrainee"
                    type="checkbox"
                    checked={newUser.isTrainee}
                    onChange={e => setNewUser({ ...newUser, isTrainee: e.target.checked })}
                />
                <label htmlFor="isTrainee">Estagiário</label>

                <input
                    id="isAdmin"
                    type="checkbox"
                    checked={newUser.isAdmin}
                    onChange={e => setNewUser({ ...newUser, isAdmin: e.target.checked })}
                />
                <label htmlFor="isAdmin">Admin</label>
            </div>

        </div>
        <div
          onClick={handleCreate}
          className="mt-2 inline-block bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 cursor-pointer"
          title="Criar usuário"
        >
          Criar
        </div>
      </div>

      <div className="bg-white shadow p-4 rounded">
        <h2 className="font-semibold mb-2">Usuários</h2>
        <ul className="space-y-4">
          {users.map(u => (
            <li key={u.id} className="border p-2 rounded flex justify-between items-center">
              {editingId === u.id ? (
                <div className="flex-1 grid grid-cols-2 gap-2">
                  {['name', 'mail', 'cooldown_minutes', 'max_requests_per_day', 'max_coffees_per_day'].map(field => (
                    <div key={field}>
                      <label className="block text-xs capitalize">{field.replace(/_/g, ' ')}</label>
                      <input
                        value={form[u.id]?.[field] ?? u[field] ?? ''}
                        onChange={e => handleInputChange(u.id, field, e.target.value)}
                        className="border p-1 w-full rounded text-xs"
                      />
                    </div>
                  ))}
                  <div className="flex items-center space-x-2">
                    <label className="text-xs">Admin</label>
                    <input
                        type="checkbox"
                        checked={form[u.id]?.isAdmin ?? u.isAdmin}
                        onChange={e => handleInputChange(u.id, 'isAdmin', e.target.checked)}
                        disabled={u.id === user.id}
                    />
                    <label className="text-xs">Estagiário</label>
                    <input
                      type="checkbox"
                      checked={form[u.id]?.isTrainee ?? u.isTrainee}
                      onChange={e => handleInputChange(u.id, 'isTrainee', e.target.checked)}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex-1">
                  <p className="font-semibold">{u.name}</p>
                  <p className="text-sm text-gray-500">{u.mail}</p>
                </div>
              )}

                <div className="flex space-x-2">
                {editingId === u.id ? (
                    <>
                    <div
                        onClick={() => handleUpdate(u.id)}
                        className="text-green-600 hover:text-green-800 cursor-pointer"
                        title="Salvar"
                    >
                        <Save size={18} />
                    </div>
                        <div
                            onClick={() => {
                                setForm(prev => {
                                const updatedForm = { ...prev };
                                delete updatedForm[u.id];  // 🔑 Limpa os dados editados desse usuário
                                return updatedForm;
                                });
                                setEditingId(null);  // 🔑 Sai do modo edição
                            }}
                            className="text-gray-600 hover:text-gray-800 cursor-pointer"
                            title="Cancelar"
                            >
                            <X size={18} />
                        </div>
                    </>
                ) : (
                    <>
                    <div
                        onClick={() => setEditingId(u.id)}
                        className="text-blue-500 hover:text-blue-700 cursor-pointer"
                        title="Editar"
                    >
                        <Pencil size={18} />
                    </div>
                    {u.id !== user.id && (
                        <div
                        onClick={() => handleDelete(u.id)}
                        className="text-red-500 hover:text-red-700 cursor-pointer"
                        title="Excluir"
                        >
                        <Trash2 size={18} />
                        </div>
                    )}
                    </>
                )}
                </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
