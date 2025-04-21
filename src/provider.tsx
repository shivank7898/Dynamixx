import React from 'react';

interface StoreProviderProps {
    children: React.ReactNode;
    persist?: boolean;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({
    children,
    persist = true
}) => {
    // Initialize store if needed
    React.useEffect(() => {
        if (!persist) {
            // Clear persistence if not needed
            localStorage.removeItem('dynamixx-store');
        }
    }, [persist]);

    return <>{children}</>;
}; 