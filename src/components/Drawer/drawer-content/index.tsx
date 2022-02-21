/* eslint-disable prettier/prettier */
import {useCallback, useState} from "react";
import {NavLink} from "react-router-dom";
import Social from "./social";
import StakeIcon from "../../../assets/icons/stake.svg";
import BondIcon from "../../../assets/icons/bond.svg";
import NostraIcon from "../../../assets/icons/fedora.png";
import {trim, shorten} from "../../../helpers";
import {useAddress} from "../../../hooks";
import useBonds from "../../../hooks/bonds";
import {Link} from "@material-ui/core";
import {Skeleton} from "@material-ui/lab";
import "./drawer-content.scss";
import DocsIcon from "../../../assets/icons/stake.svg";
import GlobeIcon from "../../../assets/icons/wonderglobe.svg";
import classnames from "classnames";
import {useTranslation} from "react-i18next";
import Icon from "@material-ui/core/Icon";
import BusinessIcon from "@mui/icons-material/Business";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FaceRetouchingNaturalIcon from "@mui/icons-material/FaceRetouchingNatural";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
import CampaignIcon from '@mui/icons-material/Campaign';

function NavContent() {
    const {t} = useTranslation();
    const [isActive] = useState();
    const address = useAddress();
    const {bonds} = useBonds();

    const checkPage = useCallback((location: any, page: string): boolean => {
        const currentPath = location.pathname.replace("/", "");
        if (currentPath.indexOf("dashboard") >= 0 && page === "dashboard") {
            return true;
        }
        if (currentPath.indexOf("stake") >= 0 && page === "stake") {
            return true;
        }
        if (currentPath.indexOf("bonds") >= 0 && page === "bonds") {
            return true;
        }
        if (currentPath.indexOf("calculator") >= 0 && page === "calculator") {
            return true;
        }
        if (currentPath.indexOf("business") >= 0 && page === "business") {
            return true;
        }
        if (currentPath.indexOf("nfts") >= 0 && page === "nfts") {
            return true;
        }
        if (currentPath.indexOf("ranking") >= 0 && page === "ranking") {
            return true;
        }
        if (currentPath.indexOf("seasons") >= 0 && page === "seasons") {
            return true;
        }
        if (currentPath.indexOf("announcements") >= 0 && page === "announcements") {
            return true;
        }
        return false;
    }, []);

    return (
        <div className="dapp-sidebar">
            <div className="branding-header">
                <Link href="/" target="_blank">
                    <img alt="Fedora Hat by iconixar from NounProject.com" className="logo-svg" src={NostraIcon} width="200" />
                </Link>
                <p className="title">
                    Nostra<span className="red">City</span>
                </p>
                {address && (
                    <div className="wallet-link">
                        <Link href={`https://cchain.explorer.avax.network/address/${address}`} target="_blank">
                            <p>{shorten(address)}</p>
                        </Link>
                    </div>
                )}
            </div>

            <div className="dapp-menu-links">
                <div className="dapp-nav">
                    <Link
                        component={NavLink}
                        to="/announcements"
                        isActive={(match: any, location: any) => {
                            return checkPage(location, "announcements");
                        }}
                        className={classnames("button-dapp-menu", {active: isActive})}
                    >
                        <div className="dapp-menu-item">
                            <CampaignIcon sx={{color: "white", marginRight: "8px"}} />
                            <p>{t("Announcements")}</p>
                        </div>
                    </Link>

                    <Link
                        component={NavLink}
                        to="/dashboard"
                        isActive={(match: any, location: any) => {
                            return checkPage(location, "dashboard");
                        }}
                        className={classnames("button-dapp-menu", {active: isActive})}
                    >
                        <div className="dapp-menu-item">
                            <DashboardIcon sx={{color: "white", marginRight: "8px"}} />
                            <p>{t("Dashboard")}</p>
                        </div>
                    </Link>

                    <Link
                        component={NavLink}
                        to="/business"
                        isActive={(match: any, location: any) => {
                            return checkPage(location, "business");
                        }}
                        className={classnames("button-dapp-menu", {active: isActive})}
                    >
                        <div className="dapp-menu-item">
                            <BusinessIcon sx={{color: "white", marginRight: "8px"}} />
                            <p>{t("Business")}</p>
                        </div>
                    </Link>

                    <Link
                        component={NavLink}
                        to="/ranking"
                        isActive={(match: any, location: any) => {
                            return checkPage(location, "ranking");
                        }}
                        className={classnames("button-dapp-menu", {active: isActive})}
                    >
                        <div className="dapp-menu-item">
                            <MilitaryTechIcon sx={{color: "white", marginRight: "8px"}} />
                            <p>{t("Ranking")}</p>
                        </div>
                    </Link>

                    <Link
                        component={NavLink}
                        to="/nfts"
                        isActive={(match: any, location: any) => {
                            return checkPage(location, "nfts");
                        }}
                        className={classnames("button-dapp-menu", {active: isActive})}
                    >
                        <div className="dapp-menu-item">
                            <FaceRetouchingNaturalIcon sx={{color: "white", marginRight: "8px"}} />
                            <p>{t("My NFTs")}</p>
                        </div>
                    </Link>
                    <Link
                        component={NavLink}
                        to="/stake"
                        isActive={(match: any, location: any) => {
                            return checkPage(location, "stake");
                        }}
                        className={classnames("button-dapp-menu", {active: isActive})}
                    >
                        <div className="dapp-menu-item">
                            <img alt="" src={StakeIcon} />
                            <p>{t("Stake")}</p>
                        </div>
                    </Link>

                    <Link
                        component={NavLink}
                        id="bond-nav"
                        to="/bonds"
                        isActive={(match: any, location: any) => {
                            return checkPage(location, "bonds");
                        }}
                        className={classnames("button-dapp-menu", {active: isActive})}
                    >
                        <div className="dapp-menu-item">
                            <img alt="" src={BondIcon} />
                            <p>{t("Bond")}</p>
                        </div>
                    </Link>

                    <div className="bond-discounts">
                        <p>{t("Bond discounts")}</p>
                        {bonds.map((bond, i) => (
                            <Link component={NavLink} to={`/bonds/${bond.name}`} key={i} className={"bond"}>
                                {!bond.bondDiscount ? (
                                    <Skeleton variant="text" width={"150px"} />
                                ) : (
                                    <p>
                                        {bond.displayName}
                                        <span className="bond-pair-roi">{bond.bondDiscount && trim(bond.bondDiscount * 100, 2)}%</span>
                                    </p>
                                )}
                            </Link>
                        ))}
                    </div>

                    <Link
                        component={NavLink}
                        to="/calculator"
                        isActive={(match: any, location: any) => {
                            return checkPage(location, "calculator");
                        }}
                        className={classnames("button-dapp-menu", {active: isActive})}
                    >
                        <div className="dapp-menu-item">
                            <img alt="" src={GlobeIcon} />
                            <p>{t("Calculator")}</p>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="dapp-menu-doc-link">
                <Link href="http://bit.ly/NostraCity" target="_blank">
                    <img alt="" src={DocsIcon} />
                    <p>{t("Docs")}</p>
                </Link>
            </div>
            <div className="dapp-menu-doc-link">
                <Link
                    component={NavLink}
                    to="/seasons"
                    isActive={(match: any, location: any) => {
                        return checkPage(location, "seasons");
                    }}
                    className={classnames("button-dapp-menu", {active: isActive})}
                >
                    <AutoAwesomeMotionIcon style={{marginRight: 10, color: "white"}} />
                    <p>{t("Seasons")}</p>
                </Link>
            </div>
            <Social />
        </div>
    );
}

export default NavContent;
