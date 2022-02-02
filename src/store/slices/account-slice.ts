import { ethers } from "ethers";
import { getAddresses } from "../../constants";
import { BossERC20Token, sBoss, MimTokenContract, wBOSS } from "../../abi";
import { setAll } from "../../helpers";

import { createSlice, createSelector, createAsyncThunk } from "@reduxjs/toolkit";
import { JsonRpcProvider, StaticJsonRpcProvider } from "@ethersproject/providers";
import { Bond } from "../../helpers/bond/bond";
import { Networks } from "../../constants/blockchain";
import React from "react";
import { RootState } from "../store";
import { IToken } from "../../helpers/tokens";

interface IGetBalances {
    address: string;
    networkID: Networks;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
}

interface IAccountBalances {
    balances: {
        sboss: string;
        boss: string;
        wsboss: string;
    };
}

export const getBalances = createAsyncThunk("account/getBalances", async ({ address, networkID, provider }: IGetBalances): Promise<IAccountBalances> => {
    const addresses = getAddresses(networkID);

    const sBossContract = new ethers.Contract(addresses.sBOSS_ADDRESS, sBoss, provider);
    const sBossBalance = await sBossContract.balanceOf(address);
    const bossContract = new ethers.Contract(addresses.BOSS_ADDRESS, BossERC20Token, provider);
    const bossBalance = await bossContract.balanceOf(address);
    const wBossContract = new ethers.Contract(addresses.wBOSS_ADDRESS, wBOSS, provider);
    const wBossBalance = await wBossContract.balanceOf(address);

    return {
        balances: {
            sboss: ethers.utils.formatUnits(sBossBalance, "gwei"),
            boss: ethers.utils.formatUnits(bossBalance, "gwei"),
            wsboss: ethers.utils.formatEther(wBossBalance),
        },
    };
});

interface ILoadAccountDetails {
    address: string;
    networkID: Networks;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
}

interface IUserAccountDetails {
    balances: {
        boss: string;
        sboss: string;
        wsboss: string;
    };
    staking: {
        boss: number;
        sboss: number;
    };
    wrapping: {
        sboss: number;
    };
}

export const loadAccountDetails = createAsyncThunk("account/loadAccountDetails", async ({ networkID, provider, address }: ILoadAccountDetails): Promise<IUserAccountDetails> => {
    console.log("loadAccountDetails", address, provider, networkID);
    let bossBalance = 0;
    let sBossBalance = 0;

    let wBossBalance = 0;
    let sbossWsBossAllowance = 0;

    let stakeAllowance = 0;
    let unstakeAllowance = 0;

    const addresses = getAddresses(networkID);

    if (addresses.BOSS_ADDRESS) {
        const bossContract = new ethers.Contract(addresses.BOSS_ADDRESS, BossERC20Token, provider);
        bossBalance = await bossContract.balanceOf(address);
        stakeAllowance = await bossContract.allowance(address, addresses.STAKING_HELPER_ADDRESS);
    }

    if (addresses.sBOSS_ADDRESS) {
        const sBossContract = new ethers.Contract(addresses.sBOSS_ADDRESS, sBoss, provider);
        sBossBalance = await sBossContract.balanceOf(address);
        unstakeAllowance = await sBossContract.allowance(address, addresses.STAKING_ADDRESS);

        if (addresses.wBOSS_ADDRESS) {
            sbossWsBossAllowance = await sBossContract.allowance(address, addresses.wBOSS_ADDRESS);
        }
    }

    if (addresses.wBOSS_ADDRESS) {
        const wBossContract = new ethers.Contract(addresses.wBOSS_ADDRESS, wBOSS, provider);
        wBossBalance = await wBossContract.balanceOf(address);
    }

    return {
        balances: {
            sboss: ethers.utils.formatUnits(sBossBalance, "gwei"),
            boss: ethers.utils.formatUnits(bossBalance, "gwei"),
            wsboss: ethers.utils.formatEther(wBossBalance),
        },
        staking: {
            boss: Number(stakeAllowance),
            sboss: Number(unstakeAllowance),
        },
        wrapping: {
            sboss: Number(sbossWsBossAllowance),
        },
    };
});

interface ICalcUserBondDetails {
    address: string;
    bond: Bond;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
    networkID: Networks;
}

export interface IUserBondDetails {
    allowance: number;
    balance: number;
    avaxBalance: number;
    interestDue: number;
    bondMaturationBlock: number;
    pendingPayout: number; //Payout formatted in gwei.
}

export const calculateUserBondDetails = createAsyncThunk("account/calculateUserBondDetails", async ({ address, bond, networkID, provider }: ICalcUserBondDetails) => {
    if (!address) {
        return new Promise<any>(resevle => {
            resevle({
                bond: "",
                displayName: "",
                bondIconSvg: "",
                isLP: false,
                allowance: 0,
                balance: 0,
                interestDue: 0,
                bondMaturationBlock: 0,
                pendingPayout: "",
                avaxBalance: 0,
            });
        });
    }

    const bondContract = bond.getContractForBond(networkID, provider);
    const reserveContract = bond.getContractForReserve(networkID, provider);

    let interestDue, pendingPayout, bondMaturationBlock;

    const bondDetails = await bondContract.bondInfo(address);
    interestDue = bondDetails.payout / Math.pow(10, 9);
    bondMaturationBlock = Number(bondDetails.vesting) + Number(bondDetails.lastTime);
    pendingPayout = await bondContract.pendingPayoutFor(address);

    let allowance,
        balance = "0";

    allowance = await reserveContract.allowance(address, bond.getAddressForBond(networkID));
    balance = await reserveContract.balanceOf(address);
    const balanceVal = ethers.utils.formatEther(balance);

    const avaxBalance = await provider.getSigner().getBalance();
    const avaxVal = ethers.utils.formatEther(avaxBalance);

    const pendingPayoutVal = ethers.utils.formatUnits(pendingPayout, "gwei");

    return {
        bond: bond.name,
        displayName: bond.displayName,
        bondIconSvg: bond.bondIconSvg,
        isLP: bond.isLP,
        allowance: Number(allowance),
        balance: Number(balanceVal),
        avaxBalance: Number(avaxVal),
        interestDue,
        bondMaturationBlock,
        pendingPayout: Number(pendingPayoutVal),
    };
});

interface ICalcUserTokenDetails {
    address: string;
    token: IToken;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
    networkID: Networks;
}

export interface IUserTokenDetails {
    allowance: number;
    balance: number;
    isAvax?: boolean;
}

export const calculateUserTokenDetails = createAsyncThunk("account/calculateUserTokenDetails", async ({ address, token, networkID, provider }: ICalcUserTokenDetails) => {
    if (!address) {
        return new Promise<any>(resevle => {
            resevle({
                token: "",
                address: "",
                img: "",
                allowance: 0,
                balance: 0,
            });
        });
    }

    if (token.isAvax) {
        const avaxBalance = await provider.getSigner().getBalance();
        const avaxVal = ethers.utils.formatEther(avaxBalance);

        return {
            token: token.name,
            tokenIcon: token.img,
            balance: Number(avaxVal),
            isAvax: true,
        };
    }

    const addresses = getAddresses(networkID);

    const tokenContract = new ethers.Contract(token.address, MimTokenContract, provider);

    let allowance,
        balance = "0";

    //allowance = await tokenContract.allowance(address, addresses.ZAPIN_ADDRESS);
    balance = await tokenContract.balanceOf(address);

    const balanceVal = Number(balance) / Math.pow(10, token.decimals);

    return {
        token: token.name,
        address: token.address,
        img: token.img,
        balance: Number(balanceVal),
    };
});
// allowance: Number(allowance),
export interface IAccountSlice {
    bonds: { [key: string]: IUserBondDetails };
    balances: {
        sboss: string;
        boss: string;
        wboss: string;
    };
    loading: boolean;
    staking: {
        boss: number;
        sboss: number;
    };
    wrapping: {
        sboss: number;
    };
    tokens: { [key: string]: IUserTokenDetails };
}

const initialState: IAccountSlice = {
    loading: true,
    bonds: {},
    balances: { sboss: "", boss: "", wboss: "" },
    staking: { boss: 0, sboss: 0 },
    wrapping: { sboss: 0 },
    tokens: {},
};

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        fetchAccountSuccess(state, action) {
            setAll(state, action.payload);
        },
    },
    extraReducers: builder => {
        builder
            .addCase(loadAccountDetails.pending, state => {
                state.loading = true;
            })
            .addCase(loadAccountDetails.fulfilled, (state, action) => {
                setAll(state, action.payload);
                state.loading = false;
            })
            .addCase(loadAccountDetails.rejected, (state, { error }) => {
                state.loading = false;
                console.log(error);
            })
            .addCase(getBalances.pending, state => {
                state.loading = true;
            })
            .addCase(getBalances.fulfilled, (state, action) => {
                setAll(state, action.payload);
                state.loading = false;
            })
            .addCase(getBalances.rejected, (state, { error }) => {
                state.loading = false;
                console.log(error);
            })
            .addCase(calculateUserBondDetails.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(calculateUserBondDetails.fulfilled, (state, action) => {
                if (!action.payload) return;
                const bond = action.payload.bond;
                state.bonds[bond] = action.payload;
                state.loading = false;
            })
            .addCase(calculateUserBondDetails.rejected, (state, { error }) => {
                state.loading = false;
                console.log(error);
            })
            .addCase(calculateUserTokenDetails.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(calculateUserTokenDetails.fulfilled, (state, action) => {
                if (!action.payload) return;
                const token = action.payload.token;
                state.tokens[token] = action.payload;
                state.loading = false;
            })
            .addCase(calculateUserTokenDetails.rejected, (state, { error }) => {
                state.loading = false;
                console.log(error);
            });
    },
});

export default accountSlice.reducer;

export const { fetchAccountSuccess } = accountSlice.actions;

const baseInfo = (state: RootState) => state.account;

export const getAccountState = createSelector(baseInfo, account => account);
