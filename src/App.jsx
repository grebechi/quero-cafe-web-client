import { AuthProvider } from './contexts/AuthContext.jsx';
import AppRoutes from './routes';

function App() {
    return (
        <AuthProvider>
            <AppRoutes />
        </AuthProvider>
    );
}

export default App;
