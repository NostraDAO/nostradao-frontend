import React from "react";
import { Link } from "@material-ui/core";
import "./main.scss";
import Fedora from "../../../../assets/icons/noun-fedora-hat.svg";
import { useTranslation } from "react-i18next";

function Main() {
    const { t } = useTranslation();
    return (
        <div className="landing-main">
            <div className="landing-main-img-wrap">
                <img src={Fedora} alt="" />
            </div>
            <div className="landing-main-btns-wrap">
                <Link href="#" target="_blank" rel="noreferrer">
                    <div className="landing-main-btn">
                        <p>{t("Enter App")}</p>
                    </div>
                </Link>
                <Link href="https://nostradao.gitbook.io/nostradao/" target="_blank" rel="noreferrer">
                    <div className="landing-main-btn">
                        <p>{t("Documentation")}</p>
                    </div>
                </Link>
            </div>
            <div className="landing-main-title-wrap">
                <p>NostraCity</p>
            </div>
            <div className="landing-main-help-text-wrap">
                <p>{t("Lorem ipsum dolor sit amet.")}</p>
                <p>{t("Lorem ipsum dolor sit amet consectetur.")}</p>
            </div>
        </div>
    );
}

export default Main;
