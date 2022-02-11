import DaiImg from "../assets/tokens/DAI.e.png";
import {IAllBondData} from "../hooks/bonds";
import {dai} from "../helpers/bond";

export const priceUnits = (bond: IAllBondData) => {
    if (bond.name === dai.name) return <img src={DaiImg} style={{height: "15px", width: "15px"}} />;

    return "$";
};
