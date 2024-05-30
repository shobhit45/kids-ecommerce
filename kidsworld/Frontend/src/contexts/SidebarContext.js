import React, { useState, createContext } from 'react';

export const SidebarContext = createContext();

const SidebarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [barCode, setbarCode] = useState(false);
  const handleClose = () => {
    setIsOpen(false)
  }

  return <SidebarContext.Provider value={{ isOpen, barCode, setbarCode, setIsOpen, handleClose }}>{children}</SidebarContext.Provider>;
};

export default SidebarProvider;
