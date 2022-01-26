export const getMainnetURI = (): string => {
    return process.env.REACT_APP_AVAX_MAINNET;
};

export const getTestnetURI = (): string => {
    return process.env.REACT_APP_AVAX_TESTNET;
};
