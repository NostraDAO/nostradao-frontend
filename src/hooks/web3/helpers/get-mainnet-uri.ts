export const getMainnetURI = (): string | undefined => {
    return process.env.REACT_APP_AVAX_MAINNET;
};

export const getTestnetURI = (): string | undefined => {
    return process.env.REACT_APP_AVAX_TESTNET;
};
