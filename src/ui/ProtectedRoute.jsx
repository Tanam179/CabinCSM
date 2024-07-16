/* eslint-disable react/prop-types */
import styled from 'styled-components';
import useUser from '../hooks/useUser';
import Spinner from './Spinner';
import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const FullPage = styled.div`
    height: 100vh;
    background-color: var(--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ProtectedRoute = ({ children }) => {
    // 1.Load the authenticated user
    const { isLoading, fetchStatus, isAuthenticated } = useUser();
    const navigate = useNavigate();

    // 3.If no authenticated user, redirect to login page
    // useEffect(() => {
    //     if(!isAuthenticated && !isLoading && fetchStatus !== 'fetching') {
    //         navigate('/login');
    //     }
    // }, [fetchStatus, isAuthenticated, isLoading, navigate])

    // 2.While loading show spinner
    if (isLoading) {
        return (
            <FullPage>
                <Spinner />
            </FullPage>
        );
    }

    if(!isAuthenticated ) {
        return <Navigate to="/login" />
    }
    
    // 4. If authenticated user, render the children component
    return children;
};

export default ProtectedRoute;
