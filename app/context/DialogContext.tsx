"use client";
import React, { createContext, useState } from "react";

interface DialogContextProps {
  valueForm: string | null;
  setValueForm: (value: string | null) => void;
  openConnexionDialog: boolean;
  setOpenConnexionDialog: (value: boolean) => void;
}
export const DialogContext = createContext({} as DialogContextProps);

interface Props {
  children: JSX.Element | JSX.Element[];
}
export const DialogContextProvider: React.FC<Props> = ({ children }) => {
  const [openConnexionDialog, setOpenConnexionDialog] =
    useState<boolean>(false);
  const [valueForm, setValueForm] = useState<string | null>(null);
  return (
    <DialogContext.Provider
      value={{
        valueForm,
        setValueForm,
        openConnexionDialog,
        setOpenConnexionDialog,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};
export default DialogContext;
