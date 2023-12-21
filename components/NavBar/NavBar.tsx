"use client";
import { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import Person from "@mui/icons-material/Person";
import Link from "next/link";
import Image from "next/image";
import logo from "../../assets/logo/Face.png";
import ConnexionDialog from "../Dialog/ConnexionDialog";
import AuthContext from "@components/app/context/AuthContext";
import Avatar from "@mui/material/Avatar";
import DialogContext from "@components/app/context/DialogContext";
import portrait from "../../assets/logo/portrait.png";

const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const {
    valueForm,
    setValueForm,
    openConnexionDialog,
    setOpenConnexionDialog,
  } = useContext(DialogContext);
  const { token, setToken, setUserId } = useContext(AuthContext);
  const open = Boolean(anchorEl);

  const menuItemList = [{ text: "Connexion" }, { text: "Inscription" }];

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDialog = (e: any) => {
    const value = e.target.id as string;
    setValueForm(value);
    handleClose();
    setOpenConnexionDialog(true);
  };

  const handleLogOut = () => {
    handleClose();
    setUserId("");
    setToken("");
  };

  return (
    <>
      <nav className="bg-background--navbar flex justify-between py-4 px-48 items-center text-white font-medium">
        <div className="flex items-center">
          <div className="relative w-10 h-10 mr-2">
            <Image
              src={logo}
              alt={"Logo Candidator"}
              title={"Logo de Candidator"}
              loading="lazy"
              fill
              sizes="(max-width: 768px) 5vw, (max-width: 1200px) 10vw"
              style={{ objectFit: "contain" }}
            />
          </div>
          <span>Candidator</span>
        </div>
        <Box
          sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
        >
          <Link href={"/"}>
            <Typography sx={{ minWidth: 100 }}>
              Découvrez des activités
            </Typography>
          </Link>
          <Link href={"/offers"}>
            <Typography sx={{ minWidth: 100 }}>Explorer</Typography>
          </Link>
          {token && (
            <Link href={"/mes-activites"}>
              <Typography sx={{ minWidth: 100 }}>Mes activités</Typography>
            </Link>
          )}
          <Tooltip title="Paramètres du profil">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              {token ? (
                <div className="relative w-8 h-8">
                  <Image
                    src={portrait}
                    alt={"portrait"}
                    title={"portrait"}
                    loading="lazy"
                    fill
                    sizes="(max-width: 1200px) 5vw"
                    style={{ objectFit: "contain" }}
                  />
                </div>
              ) : (
                <Person
                  sx={{
                    width: 32,
                    height: 32,
                    backgroundColor: "white",
                    borderRadius: "50%",
                    padding: "5px",
                  }}
                />
              )}
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          {token !== "" ? (
            <div>
              <MenuItem onClick={handleClose}>
                <Avatar /> Mon profil
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogOut}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </div>
          ) : (
            menuItemList.map(({ text }) => (
              <MenuItem key={text} onClick={(e) => handleDialog(e)} id={text}>
                {text}
              </MenuItem>
            ))
          )}
        </Menu>
      </nav>
      <ConnexionDialog
        openConnexionDialog={openConnexionDialog}
        setOpenConnexionDialog={setOpenConnexionDialog}
        valueForm={valueForm}
      />
    </>
  );
};

export default NavBar;
