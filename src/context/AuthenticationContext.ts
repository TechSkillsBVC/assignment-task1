import { createContext } from 'react';
import { User } from '../types/Users';

export type AuthenticationContextObject = {
    value: User;
    setValue: (newValue: User | undefined) => void;
};

export const AuthenticationContext = createContext<AuthenticationContextObject | null>(null);
