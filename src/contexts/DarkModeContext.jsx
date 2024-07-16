/* eslint-disable react/prop-types */
import { createContext, useContext } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

const DarkModeContext = createContext();

const DarkModeProvider = function ({ children }) {
    const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, 'isDarkMode');
    const toggleDarkMode = function() {
        setIsDarkMode(!isDarkMode);
    }

    return <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>{children}</DarkModeContext.Provider>;
};

const useDarkMode = function() {
    const context = useContext(DarkModeContext);
    if(context === undefined) {
        throw new Error('useDarkMode must be used within a DarkModeProvider');
    }

    return context;
}


export { DarkModeProvider, useDarkMode };