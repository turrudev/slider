import React, {createContext, useEffect, useState} from 'react';

const THEME_CONFIG = require("../config/theme.config.json");

const ThemeContext = createContext({});

export interface ThemeContextResult {
    [key: string]: Record<string, string>
}

interface ThemeContextProps {
    children: React.ReactNode
}

const ThemeProvider: React.FC<ThemeContextProps> = ({children}: ThemeContextProps): JSX.Element => {
    const [theme, setTheme] = useState(getCurrentTheme());

    useEffect(() => {
        const setCurrentTheme = (): void => {
            setTheme(getCurrentTheme());
        };

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setCurrentTheme);
        return () => window.matchMedia('(prefers-color-scheme: dark)').removeEventListener("change", setCurrentTheme);
    }, []);

    function getCurrentTheme(): Record<string, any> {
        return {
            name: isDarkMode() ? "dark" : "normal",
            ...THEME_CONFIG[isDarkMode() ? "dark" : "normal"]
        };
    }

    return (
        <ThemeContext.Provider value={{theme}}>
            {children}
        </ThemeContext.Provider>
    )
};

const isDarkMode = () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

export default ThemeContext;

export {ThemeProvider}
