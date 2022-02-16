/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import {Zoom, Backdrop } from "@material-ui/core";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import {trim} from "../../helpers";
import "./business.scss";
import {Skeleton} from "@material-ui/lab";
import {IReduxState} from "../../store/slices/state.interface";
import {IAppSlice} from "../../store/slices/app-slice";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {useTranslation} from "react-i18next";
import {useWeb3Context} from "../../hooks";
import BusinessMap from "../../assets/icons/map_ref.png";
import Overlay from "../../assets/icons/overlay.png";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ImageMapper from "react-img-mapper-extended";
import Areas from "./areas.json";
import {BusinessMint} from "./BusinessMint";
import Input from "@mui/material/Input";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "black",
    color: "white",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

function Business(props: any) {
    const {provider, address, connect, chainID, checkWrongNetwork} = useWeb3Context();
    const {t} = useTranslation();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [openMint, setOpenMint] = useState(false);
    const handleOpenMint = () => setOpenMint(true);
    const handleCloseMint = () => setOpenMint(false);
    const [businessOpen, setBusinessOpen] = useState('none');
    const ariaLabel = { 'aria-label': 'description' };
    const MAP = {
        name: "Map",
        areas: Areas,
    };

    function handleOverlayClick(event, index) {
        console.log("event", event.title);
        if (event.title == "Diner") {
           setBusinessOpen('diner');
           setOpenMint(true);

        }
        if (event.title == "Grocery") {
            setBusinessOpen('grocery');
            setOpenMint(true);

        }
        if (event.title == "BarberShop") {
            setBusinessOpen('barbershop');
            setOpenMint(true);
        }
    }

    function handleMint(){
        console.log('minted');
    }

    return (
        <div className="business-view">
            <Zoom in={true}>
                <div className="business-card">
                    <Grid className="business-card-grid" container direction="column" spacing={2}>
                        <Grid item>
                            <div className="business-card-header">
                                <p className="business-card-header-title">{t("Choose a Business")} </p>
                            </div>
                        </Grid>
                        <Grid item>
                            {!address && (
                                <div className="business-card-wallet-notification">
                                    <div className="business-card-wallet-connect-btn" onClick={connect}>
                                        <p>{t("Connect Wallet")}</p>
                                    </div>
                                    <p className="business-card-wallet-desc-text">{t("Connect your wallet to stake BOSS tokens!")}</p>
                                </div>
                            )}
                            {address && (
                                <div className="business-card-action-area">
                                    <div className="business-image-wrapper" onClick={handleOpen}>
                                        <img src={BusinessMap} width="90%" />
                                    </div>
                                    <Modal  open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                                        <Box sx={style}>
                                            <div className="overlay"></div>
                                            <ImageMapper src={BusinessMap} map={MAP} onClick={event => handleOverlayClick(event, props)} />
                                            
                                            <BusinessMint isOpen={openMint} handleClose={handleCloseMint} handleMint={handleMint} title={t("business.mint.title")}>
                                                <>
                                                <p>{t("business.mint.Imagen")}</p>
                                                <p>{t("business.mint.description")}</p>
                                                </>
                                            </BusinessMint>
                                            
                                        </Box>
                                    </Modal>
                                </div>
                            )}
                        </Grid>
                    </Grid>
                </div>
            </Zoom>
        </div>
    );
}

export default Business;
