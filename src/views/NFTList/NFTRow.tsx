import {priceUnits, trim} from "../../helpers";
import {Paper, TableRow, TableCell, Slide, Link} from "@material-ui/core";
import "./choosebond.scss";
import {Skeleton} from "@material-ui/lab";
// import {IAllBondData} from "../../hooks/bonds";
import {useTranslation} from "react-i18next";

interface INFTProps {
    nft: IAllNftOwnedData;
}

export function NFTRow({nft}: INFTProps) {
    const {t} = useTranslation();
    return (
        <TableRow>
            <TableCell align="left">
                <BondLogo bond={bond} />
                <div className="bond-name">
                    <p className="bond-name-title">{bond.displayName}</p>
                    {bond.isLP && (
                        <Link color="primary" href={bond.lpUrl} target="_blank">
                            <p className="bond-name-title">{t("View Contract")}</p>
                        </Link>
                    )}
                </div>
            </TableCell>
            <TableCell align="center">
                <p className="bond-name-title">
                    <>
                        <span className="currency-icon">{priceUnits(bond)}</span> {isBondLoading ? <Skeleton width="50px" /> : trim(bond.bondPrice, 2)}
                    </>
                </p>
            </TableCell>
            <TableCell align="right">
                <p className="bond-name-title">{isBondLoading ? <Skeleton width="50px" /> : `${trim(bond.bondDiscount * 100, 2)}%`}</p>
            </TableCell>
            <TableCell align="right">
                <p className="bond-name-title">
                    {isBondLoading ? (
                        <Skeleton width="50px" />
                    ) : (
                        new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                            maximumFractionDigits: 0,
                            minimumFractionDigits: 0,
                        }).format(bond.purchased)
                    )}
                </p>
            </TableCell>
            <TableCell>
                <Link component={NavLink} to={`/bonds/${bond.name}`}>
                    <div className="bond-table-btn">
                        <p>{t("Bond")}</p>
                    </div>
                </Link>
            </TableCell>
        </TableRow>
    );
}
