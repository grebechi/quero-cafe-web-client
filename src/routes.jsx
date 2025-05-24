import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import NewSetting from './components/NewSetting';
import UserManagement from './components/UserManagement';
import { useAuth } from './contexts/AuthContext';

export default function AppRoutes() {
    const { user } = useAuth();

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/settings/new" element={<NewSetting />} />
                {user?.isAdmin && (
                    <Route path="/admin/users" element={<UserManagement />} />
                )}
            </Routes>
        </BrowserRouter>
    );
}
