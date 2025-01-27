import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';
import Cabins from './pages/Cabins';
import NewUsers from './pages/Users';
import Settings from './pages/Settings';
import Account from './pages/Account';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import AppLayout from './ui/AppLayout';
import Booking from './pages/Booking';
import Checkin from './pages/Checkin';
import ProtectedRoute from './ui/ProtectedRoute';
import { DarkModeProvider } from './contexts/DarkModeContext';

const queryClient = new QueryClient();

const App = () => {
    return (
        <DarkModeProvider>
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools initialIsOpen={false} />
                <BrowserRouter>
                    <Routes>
                        <Route
                            element={
                                <ProtectedRoute>
                                    <AppLayout />
                                </ProtectedRoute>
                            }
                        >
                            <Route index element={<Navigate replace to="dashboard" />} />
                            <Route path="dashboard" element={<Dashboard />} />
                            <Route path="bookings" element={<Bookings />} />
                            <Route path="bookings/:bookingId" element={<Booking />} />
                            <Route path="checkin/:bookingId" element={<Checkin />} />
                            <Route path="cabins" element={<Cabins />} />
                            <Route path="users" element={<NewUsers />} />
                            <Route path="settings" element={<Settings />} />
                            <Route path="account" element={<Account />} />
                        </Route>
                        <Route path="login" element={<Login />} />
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </BrowserRouter>
                <ToastContainer
                    position="top-center"
                    autoClose={3000}
                    pauseOnHover={false}
                    closeButton={false}
                    toastStyle={{
                        fontSize: '16px',
                        padding: '16px 24px',
                        color: 'var(--color-grey-700)',
                        fontWeight: 500,
                        whiteSpace: 'nowrap',
                        width: 'fit-content',
                    }}
                />
            </QueryClientProvider>
        </DarkModeProvider>
    );
};

export default App;
