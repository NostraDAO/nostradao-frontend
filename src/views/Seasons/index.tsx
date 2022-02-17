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
import "./seasons.scss";
import {Skeleton} from "@material-ui/lab";
import {IReduxState} from "../../store/slices/state.interface";
import {IAppSlice} from "../../store/slices/app-slice";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useTranslation} from "react-i18next";
import {useWeb3Context} from "../../hooks";

function Seasons(props: any) {
    const {provider, address, connect, chainID, checkWrongNetwork} = useWeb3Context();
    const {t} = useTranslation();
    
    const ariaLabel = { 'aria-label': 'description' };
    
    return (
        <div className="seasons-view">
            <Zoom in={true}>
                <div className="seasons-card">
                    <Grid className="seasons-card-grid" container direction="column" spacing={2}>
                        <Grid item>
                            <div className="seasons-card-header">
                                <p className="seasons-card-header-title">{t("Choose a Business")} </p>
                            </div>
                        </Grid>
                        <Grid item>
                                <div className="seasons-card-action-area">
                                </div>
                        </Grid>
                    </Grid>
                </div>
            </Zoom>
        </div>
    );
}

export default Seasons;
