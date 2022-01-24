export const getMainnetURI = (): string => {
    return "https://api.avax.network/ext/bc/C/rpc";
};

export const getTestnetURI = (): string | undefined => {
    return process.env.REACT_APP_AVAX_TESTNET;
};
