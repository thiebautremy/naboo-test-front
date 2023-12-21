import React, { FC } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Close from "@mui/icons-material/Close";
import SignUpForm from "../Forms/SignUpForm";
import LogInForm from "../Forms/LogInForm";

type ConnexionDialogType = {
  openConnexionDialog: boolean;
  setOpenConnexionDialog: (value: boolean) => void;
  valueForm: string | null;
};

const ConnexionDialog: FC<ConnexionDialogType> = ({
  setOpenConnexionDialog,
  openConnexionDialog,
  valueForm,
}) => {
  const handleClose = () => {
    setOpenConnexionDialog(false);
  };
  return (
    <Dialog onClose={handleClose} open={openConnexionDialog}>
      <div className="px-12 pb-12">
        <DialogTitle className="flex justify-between mb-12">
          {valueForm}
          <Close
            onClick={() => setOpenConnexionDialog(false)}
            className="hover:cursor-pointer"
          />
        </DialogTitle>
        {valueForm === "Inscription" ? <SignUpForm /> : <LogInForm />}
      </div>
    </Dialog>
  );
};
export default ConnexionDialog;
