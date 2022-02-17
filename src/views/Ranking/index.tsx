import {useSelector} from "react-redux";
import {Paper, Grid, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Zoom} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {trim} from "../../helpers";
import "./ranking.scss";
import {Skeleton} from "@material-ui/lab";
import {IReduxState} from "../../store/slices/state.interface";
import {useTranslation} from "react-i18next";
import { RankRow } from "./RankRow";
const businessArray = [];

function Ranking() {
    const {t} = useTranslation();
    const isSmallScreen = useMediaQuery("(max-width: 733px)"); // change to breakpoint query
    const isAppLoading = useSelector<IReduxState, boolean>(state => state.app.loading);


    return (
        <div className="choose-bond-view">
            <Zoom in={true}>
                <div className="choose-bond-view-card">
                    <div className="choose-bond-view-card-header">
                        <p className="choose-bond-view-card-title">{t("Business Rankings")}</p>
                    </div>

                    <Grid container item xs={12} spacing={2} className="choose-bond-view-card-metrics">
                        <Grid item xs={12} sm={6}>
                            <Box textAlign="center"></Box>
                        </Grid>
                    </Grid>

                    {!isSmallScreen && (
                        <Grid container item>
                            <TableContainer className="choose-bond-view-card-table">
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">
                                                <p className="choose-bond-view-card-table-title">{t("Item")}</p>
                                            </TableCell>
                                            <TableCell align="center">
                                                <p className="choose-bond-view-card-table-title">{t("Type")}</p>
                                            </TableCell>
                                            <TableCell align="right">
                                                <p className="choose-bond-view-card-table-title">{t("Purchased")}</p>
                                            </TableCell>
                                            <TableCell align="right"></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {businessArray.map(business => (
                                            <RankRow name={business.name} />
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    )}
                </div>
            </Zoom>

            {isSmallScreen && (
                <div className="choose-bond-view-card-container">
                    <Grid container item spacing={2}>
                        {businessArray.map(business => (
                            <Grid item xs={12} key={business.name}>
                                <RankRow name={business.name}  /> 
                            </Grid>
                        ))}
                    </Grid>
                </div>
            )}
        </div>
    );
}

export default Ranking;
