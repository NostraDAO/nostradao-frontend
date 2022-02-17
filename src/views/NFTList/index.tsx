import {useSelector} from "react-redux";
import {Paper, Grid, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Zoom} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {trim} from "../../helpers";
import "./nft.scss";
import {Skeleton} from "@material-ui/lab";
import {IReduxState} from "../../store/slices/state.interface";
import {useTranslation} from "react-i18next";

// interface nftProps {
//     id: string;
//     name: string;
// }

// interface nftPropsArray {
//     [key: string]: nftProps;
// }

// const NFTRow : nftPropsArray = [
//     "0" : {id: "1", name: "teste"},
//     "1": {id: "2", name: "teste"},
// ];

function NFTList() {
    const {t} = useTranslation();
    const isSmallScreen = useMediaQuery("(max-width: 733px)"); // change to breakpoint query
    const ownedNFTs = [];
    const isAppLoading = useSelector<IReduxState, boolean>(state => state.app.loading);
    const marketPrice = useSelector<IReduxState, number>(state => {
        return state.app.marketPrice;
    });

    return (
        <div className="choose-bond-view">
            <Zoom in={true}>
                <div className="choose-bond-view-card">
                    <div className="choose-bond-view-card-header">
                        <p className="choose-bond-view-card-title">{t("My NFTs")}</p>
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
                                                <p className="choose-bond-view-card-table-title">{t("Price")}</p>
                                            </TableCell>
                                            <TableCell align="right">
                                                <p className="choose-bond-view-card-table-title">{t("Purchased")}</p>
                                            </TableCell>
                                            <TableCell align="right"></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {ownedNFTs.map(nft => (
                                            // <NFTRow key={nft.name} nft={nft} />
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
                        {ownedNFTs.map(nft => (
                            <Grid item xs={12} key={nft.name}>
                                {/* <NFTRow key={nft.name} bond={bond} /> */}
                            </Grid>
                        ))}
                    </Grid>
                </div>
            )}
        </div>
    );
}

export default NFTList;
