import { StaticJsonRpcProvider } from "@ethersproject/providers";
import { Networks } from "../constants/blockchain";
import { IBondingCalculator } from "../abi";
import { ethers } from "ethers";
import { getAddresses } from "../constants/addresses";

export function getBondCalculator(networkID: Networks, provider: StaticJsonRpcProvider) {
    const addresses = getAddresses(networkID);
    return new ethers.Contract(addresses.BOSS_BONDING_CALC_ADDRESS, IBondingCalculator, provider);
}
