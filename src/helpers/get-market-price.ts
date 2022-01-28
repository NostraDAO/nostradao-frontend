import { ethers } from "ethers";
// import { LpReserveContract } from "../abi";
import { mim } from "../helpers/bond";
import { Networks } from "../constants/blockchain";

export async function getMarketPrice(networkID: Networks, provider: ethers.Signer | ethers.providers.Provider): Promise<number> {
    const mimAddress = mim.getAddressForReserve(networkID);
    // const pairContract = new ethers.Contract(mimAddress, provider);
    // const reserves = await pairContract.getReserves();
    const marketPrice = 10;
    //reserves[0] / reserves[1];
    return marketPrice;
}
