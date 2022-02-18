import React, {useState} from "react";
import "./header.scss";
import {SvgIcon, Link, Box, Popper, Fade} from "@material-ui/core";
import {ReactComponent as GitHub} from "../../../../assets/icons/github.svg";
import {ReactComponent as Twitter} from "../../../../assets/icons/twitter.svg";
import {ReactComponent as Telegram} from "../../../../assets/icons/telegram.svg";
import {ReactComponent as Discord} from "../../../../assets/icons/discord.svg";
import Fedora from "../../../../assets/icons/fedora.png";
import Toggle from "../../../../components/Toggle";

function Header(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [theme, setTheme] = useState("light");

    const handleClick = (event: any) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const toggleTheme = () => {
        console.log("toggleTheme");
        if (theme === "light") {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    };

    const open = Boolean(anchorEl);

    return (
        <div className="landing-header">
            <div style={{display: "flex", alignItems: "center", columnGap: "20px"}}>
                <img color="primary" src={Fedora} style={{maxWidth: 174, maxHeight: 40}} />
                <h2 className="title-header">
                    Nostra<span>City</span>
                </h2>
            </div>
            <div className="landing-header-nav-wrap">
                <Box component="div" onMouseEnter={e => handleClick(e)} onMouseLeave={e => handleClick(e)}>
                    <p className="landing-header-nav-text">Social</p>
                    <Popper className="landing-header-poper" open={open} anchorEl={anchorEl} transition>
                        {({TransitionProps}) => (
                            <Fade {...TransitionProps} timeout={200}>
                                <div className="tooltip">
                                    <Link className="tooltip-item" href="https://github.com/NostraDAO/nostradao-frontend" target="_blank">
                                        <SvgIcon color="primary" component={GitHub} />
                                        <p>GitHub</p>
                                    </Link>
                                    <Link className="tooltip-item" href="https://twitter.com/NostraDAO" target="_blank">
                                        <SvgIcon color="primary" component={Twitter} />
                                        <p>Twitter</p>
                                    </Link>
                                    <Link className="tooltip-item" href="#" target="_blank">
                                        <SvgIcon viewBox="0 0 32 32" color="primary" component={Telegram} />
                                        <p>Telegram</p>
                                    </Link>
                                    <Link className="tooltip-item" href="https://discord.gg/nostracityhq" target="_blank">
                                        <SvgIcon color="primary" component={Discord} />
                                        <p>Discord</p>
                                    </Link>
                                </div>
                            </Fade>
                        )}
                    </Popper>
                </Box>
                {/* <div className="landing-header-nav-text">
                    <Toggle theme={theme} toggleTheme={toggleTheme} />
                </div> */}
            </div>
        </div>
    );
}

export default Header;
