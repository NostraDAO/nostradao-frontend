import {priceUnits, trim} from "../../helpers";
import {Paper, TableRow, TableCell, Slide, Link} from "@material-ui/core";
import "./nft-row.scss";
import {Skeleton} from "@material-ui/lab";
// import {IAllBondData} from "../../hooks/bonds";
import {useTranslation} from "react-i18next";

export interface INft {
    id: string;
    name: string;
    type?: string;
    image?: string;
    price?: number;
    priceUnit?: string;
    description?: string;
    url?: string;
}

export interface NftList {
    nft: INft[];
}

 export function RankRow(props) {
    const {t} = useTranslation();
    return (
        <TableRow>
            <TableCell align="left">
                <div className="bond-name">
                    <p className="bond-name-title">{props.name}</p>
                </div>
            </TableCell>
            <TableCell align="left">
                <p className="bond-name-title">{props.type}</p>
            </TableCell>
        </TableRow>
    );
}

