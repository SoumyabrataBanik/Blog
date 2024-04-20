import { useSelector } from "react-redux";
import { RootState } from "../redux-store/store";
import React from "react";

interface ThemeProviderProps {
    children: React.ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const { theme } = useSelector((state: RootState) => state.theme);

    return (
        <div className={theme}>
            <div className="bg-white text-gray-800 dark:bg-gray-700 dark:text-gray-50 min-h-screen">
                {children}
            </div>
        </div>
    );
};

export default ThemeProvider;
