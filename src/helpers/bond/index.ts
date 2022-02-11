import {Networks} from "../../constants/blockchain";
import {LPBond, CustomLPBond} from "./lp-bond";
import {StableBond, CustomBond} from "./stable-bond";

import DaiIcon from "../../assets/tokens/DAI.e.png";
import MimTimeIcon from "../../assets/tokens/TIME-MIM.svg";

import {MIMBondDepository, MimTokenContract} from "../../abi";

export const dai = new StableBond({
    name: "dai",
    displayName: "DAI",
    bondToken: "DAI",
    bondIconSvg: DaiIcon,
    bondContractABI: MIMBondDepository,
    reserveContractAbi: MimTokenContract,
    networkAddrs: {
        [Networks.AVAX_TESTNET]: {
            // todo: remove this and add the actual bond address and reserve
            bondAddress: "0xE6234E0C1D40c945be40a2acFd77eFC4c514ECe7",
            reserveAddress: "0x130966628846BFd36ff31a822705796e8cb8C18D",
        },
    },
    tokensInStrategy: "60500000000000000000000000",
});

export default [dai];
