import {useState} from "react";
import {getAddresses, TOKEN_DECIMALS, TESTNETWORK} from "../../../constants";
import {useSelector} from "react-redux";
import {Link, Fade, Popper} from "@material-ui/core";
import "./time-menu.scss";
import {IReduxState} from "../../../store/slices/state.interface";
import {getTokenUrl} from "../../../helpers";
import {useTranslation} from "react-i18next";

const addTokenToWallet = (tokenSymbol: string, tokenAddress: string) => async () => {
    const tokenImage = getTokenUrl(tokenSymbol.toLowerCase());
    const {t} = useTranslation();
    if (window.ethereum) {
        try {
            await window.ethereum.request({
                method: "wallet_watchAsset",
                params: {
                    type: "ERC20",
                    options: {
                        address: tokenAddress,
                        symbol: tokenSymbol,
                        decimals: TOKEN_DECIMALS,
                        image: tokenImage,
                    },
                },
            });
        } catch (error) {
            console.log(error);
        }
    }
};

function TimeMenu() {
    const [anchorEl, setAnchorEl] = useState(null);
    const isEthereumAPIAvailable = window.ethereum;

    const networkID = useSelector<IReduxState, number>(state => {
        return (state.app && state.app.networkID) || TESTNETWORK;
    });

    const addresses = getAddresses(networkID);

    const DAI_ADDRESS = addresses.DAI_ADDRESS;
    const BOSS_ADDRESS = addresses.BOSS_ADDRESS;

    const handleClick = (event: any) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);

    return (
        <div className="time-menu-root" onMouseEnter={e => handleClick(e)} onMouseLeave={e => handleClick(e)}>
            <div className="time-menu-btn">
                <p>BOSS</p>
            </div>

            <Popper className="time-menu-popper" open={open} anchorEl={anchorEl} transition>
                {({TransitionProps}) => (
                    <Fade {...TransitionProps} timeout={200}>
                        <div className="tooltip">
                            <Link className="tooltip-item" href={`https://www.traderjoexyz.com/#/trade?inputCurrency=&outputCurrency=${BOSS_ADDRESS}`} target="_blank">
                                <p>t('Buy on Trader Joe')</p>
                            </Link>

                            {isEthereumAPIAvailable && (
                                <div className="add-tokens">
                                    <div className="divider" />
                                    <p className="add-tokens-title">t('ADD TOKEN TO WALLET')</p>
                                    <div className="divider" />
                                    <div className="tooltip-item" onClick={addTokenToWallet("BOSS", BOSS_ADDRESS)}>
                                        <p>BOSS</p>
                                    </div>
                                    <div className="tooltip-item" onClick={addTokenToWallet("DAI", DAI_ADDRESS)}>
                                        <p>DAI</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Fade>
                )}
            </Popper>
        </div>
    );
}

export default TimeMenu;
