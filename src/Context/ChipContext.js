// SpotifyContext.js
import React, { createContext, useState } from 'react';
import contactData from '../Utils/constants';
const ChipContext = createContext();

export const ChipProvider = ({ children }) => {

    const [selectedContacts, setSelectedContacts] = useState([])
    const [unSelectedContacts, setUnSelectedContacts] = useState(contactData);

    return (
        <ChipContext.Provider value={{ selectedContacts ,setSelectedContacts ,unSelectedContacts ,setUnSelectedContacts}}>
            {children}
        </ChipContext.Provider>
    );
};

export default ChipContext;
