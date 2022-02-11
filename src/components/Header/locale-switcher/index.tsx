import {useState} from "react";
import {useSelector} from "react-redux";
import {Link, Fade, Popper} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import Flag from "react-world-flags";

import "./localeSwitcher.scss";
import {IReduxState} from "../../../store/slices/state.interface";

function LocaleSwitcher() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [activeFlag, setActiveFlag] = useState(840);
    const {i18n} = useTranslation();

    function changeLanguage(value: string, e) {
        i18n.changeLanguage(value);
        if (value === "en") {
            setActiveFlag(840);
        }
        if (value === "ch") {
            setActiveFlag(156);
        }
        if (value === "pt") {
            setActiveFlag(620);
        }
        if (value === "fr") {
            setActiveFlag(250);
        }
    }

    const handleClick = e => {
        setAnchorEl(anchorEl ? null : e.currentTarget);
    };

    const open = Boolean(anchorEl);

    return (
        <div className="time-menu-root" onMouseEnter={e => handleClick(e)} onMouseLeave={e => handleClick(e)}>
            <div className="time-menu-btn">
                <Flag code={activeFlag} height="16" />
            </div>

            <Popper className="time-menu-popper" open={open} anchorEl={anchorEl} transition>
                {({TransitionProps}) => (
                    <Fade {...TransitionProps} timeout={200}>
                        <div className="tooltip">
                            <div className="add-tokens">
                                <div className="tooltip-item" onClick={e => changeLanguage("en", e)}>
                                    <Flag code={840} height="16" />
                                </div>
                                <div className="tooltip-item" onClick={e => changeLanguage("ch", e)}>
                                    <Flag code={156} height="16" />
                                </div>
                                <div className="tooltip-item" onClick={e => changeLanguage("pt", e)}>
                                    <Flag code={620} height="16" />
                                </div>
                                <div className="tooltip-item" onClick={e => changeLanguage("fr", e)}>
                                    <Flag code={250} height="16" />
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
