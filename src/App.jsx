import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from '../pages/Dashboard';
import Bookings from '../pages/Bookings';
import Cabins from '../pages/Cabins';
import NewUsers from '../pages/Users';
import Settings from '../pages/Settings';
import Account from '../pages/Account';
import Login from '../pages/Login';
import PageNotFound from '../pages/PageNotFound';
import GlobalStye from '../styles/GlobalStyle';
import AppLayout from '../ui/AppLayout';

const queryClient = new QueryClient();

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <GlobalStye />
            <BrowserRouter>
                <Routes>
                    <Route element={<AppLayout />}>
                        <Route index element={<Navigate replace to="dashboard" />} />
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="bookings" element={<Bookings />} />
                        <Route path="cabins" element={<Cabins />} />
                        <Route path="users" element={<NewUsers />} />
                        <Route path="settings" element={<Settings />} />
                        <Route path="account" element={<Account />} />
                        <Route path="login" element={<Login />} />
                        <Route path="*" element={<PageNotFound />} />
                    </Route>
                </Routes>
            </BrowserRouter>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                pauseOnHover={false}
                closeButton={false}
                toastStyle={{
                    fontSize: '16px',
                    maxWidth: '500px',
                    padding: '16px 24px',
                    color: 'var(--color-grey-700)',
                    fontWeight: 500,
                }}
                
            />
        </QueryClientProvider>
    );
};

export default App;
