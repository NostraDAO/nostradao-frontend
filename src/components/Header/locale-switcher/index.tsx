import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, Fade, Popper } from "@material-ui/core";
import "./localeSwitcher.scss";
import { IReduxState } from "../../../store/slices/state.interface";

import { useTranslation } from "react-i18next";

function LocaleSwitcher() {
    const [anchorEl, setAnchorEl] = useState(null);

    const { i18n } = useTranslation();

    function changeLanguage(value: string, e) {
        i18n.changeLanguage(value);
    }

    const handleClick = e => {
        setAnchorEl(anchorEl ? null : e.currentTarget);
    };

    const open = Boolean(anchorEl);

    return (
        <div className="time-menu-root" onMouseEnter={e => handleClick(e)} onMouseLeave={e => handleClick(e)}>
            <div className="time-menu-btn">
                <p>Language</p>
            </div>

            <Popper className="time-menu-popper" open={open} anchorEl={anchorEl} transition>
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={200}>
                        <div className="tooltip">
                            <div className="add-tokens">
                                <div className="tooltip-item" onClick={e => changeLanguage("en", e)}>
                                    <p>English</p>
                                </div>
                                <div className="tooltip-item" onClick={e => changeLanguage("ch", e)}>
                                    <p>Chinese</p>
                                </div>
                                <div className="tooltip-item" onClick={e => changeLanguage("pt", e)}>
                                    <p>Portuguese</p>
                                </div>
                            </div>
                        </div>
                    </Fade>
                )}
            </Popper>
        </div>
    );
}

export default LocaleSwitcher;
