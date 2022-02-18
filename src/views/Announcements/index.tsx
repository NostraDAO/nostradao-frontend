/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import {Zoom, Backdrop} from "@material-ui/core";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import {trim} from "../../helpers";
import "./announcements.scss";
import {Skeleton} from "@material-ui/lab";
import {IReduxState} from "../../store/slices/state.interface";
import {IAppSlice} from "../../store/slices/app-slice";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useTranslation} from "react-i18next";
import {useWeb3Context} from "../../hooks";
import Alert from '@mui/material/Alert';

function Announcements(props: any) {
    const {t} = useTranslation();

    const ariaLabel = {"aria-label": "description"};

    return (
        <div className="announ-view">
            <Zoom in={true}>
                <div className="announ-card">
                    <Grid className="announ-card-grid" container direction="column" spacing={2}>
                        <Grid item>
                            <div className="announ-card-header">
                                <p className="announ-card-header-title">{t("Announcements")} </p>
                            </div>
                        </Grid>
                        <Grid item>
                            <div className="announ-card-content">
                                <Stack sx={{width: "100%"}} spacing={2}>
                                    <Alert variant="outlined" severity="error">This is an error alert — check it out!</Alert>
                                    <Alert  variant="outlined" severity="warning">This is a warning alert — check it out!</Alert>
                                    <Alert  variant="outlined" severity="info">This is an info alert — check it out!</Alert>
                                    <Alert  variant="outlined" severity="success">This is a success alert — check it out!</Alert>
                                </Stack>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </Zoom>
        </div>
    );
}

export default Announcements;
