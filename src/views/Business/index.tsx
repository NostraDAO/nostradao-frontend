/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import {Zoom} from "@material-ui/core";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
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

function Business() {
    const {t} = useTranslation();
    const isAppLoading = useSelector<IReduxState, boolean>(state => state.app.loading);
    const app = useSelector<IReduxState, IAppSlice>(state => state.app);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: "absolute" as "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        height:300,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
    };

    return (
        <div className="dashboard-view">
            <div className="dashboard-infos-wrap">
                <Zoom in={true}>
                    <Stack direction="row" spacing={4}>
                        <Card className="dashboard-card">
                            <CardMedia component="img" height="140" image="https://picsum.photos/140" alt="green iguana" />
                            <CardContent>
                                <p className="card-title">{t("Business 1")}</p>
                                <p className="card-value">{t("Lorem ipsum dolor sit amet consectetur. ")}</p>
                            </CardContent>
                            <CardActions>
                                <Button onClick={handleOpen}>Learn more</Button>
                                <div>
                                    <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                                        <Box sx={style}>
                                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                                Business 1
                                            </Typography>
                                            <Typography id="modal-modal-description" sx={{mt: 2}}>
                                                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                                            </Typography>
                                        </Box>
                                    </Modal>
                                </div>
                            </CardActions>
                        </Card>
                        <Card className="dashboard-card">
                            <CardMedia component="img" height="140" image="https://picsum.photos/140" alt="green iguana" />

                            <CardContent>
                                <p className="card-title">{t("Business 2")}</p>
                                <p className="card-value">Lorem ipsum dolor sit amet consectetur. </p>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={handleOpen}  >Learn More</Button>
                                <div>
                                    <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                                        <Box sx={style}>
                                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                                Business 2
                                            </Typography>
                                            <Typography id="modal-modal-description" sx={{mt: 2}}>
                                                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                                            </Typography>
                                        </Box>
                                    </Modal>
                                </div>
                            </CardActions>
                        </Card>

                        <Card className="dashboard-card">
                            <CardMedia component="img" height="140" image="https://picsum.photos/140" alt="green iguana" />

                            <CardContent>
                                <p className="card-title">{t("Business 3")}</p>
                                <p className="card-value">Lorem ipsum dolor sit amet consectetur. </p>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={handleOpen} >Learn More</Button>
                                <div>
                                    <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                                        <Box sx={style}>
                                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                               Business 3
                                            </Typography>
                                            <Typography id="modal-modal-description" sx={{mt: 2}}>
                                                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                                            </Typography>
                                        </Box>
                                    </Modal>
                                </div>
                            </CardActions>
                        </Card>
                    </Stack>
                </Zoom>
            </div>
        </div>
    );
}

export default Business;
