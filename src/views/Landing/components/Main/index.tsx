import React from "react";
import { Link } from "@material-ui/core";
import "./main.scss";
import Fedora from "../../../../assets/icons/noun-fedora-hat.svg";

function Main() {
    return (
        <div className="landing-main">
            <div className="landing-main-img-wrap">
                <img src={Fedora} alt="" />
            </div>
            <div className="landing-main-btns-wrap">
                <Link href="#" target="_blank" rel="noreferrer">
                    <div className="landing-main-btn">
                        <p>Enter App</p>
                    </div>
                </Link>
                <Link href="https://nostradao.gitbook.io/nostradao/" target="_blank" rel="noreferrer">
                    <div className="landing-main-btn">
                        <p>Documentation</p>
                    </div>
                </Link>
            </div>
            <div className="landing-main-title-wrap">
                <p>The Defi</p>
                <p>Gangsta</p>
            </div>
            <div className="landing-main-help-text-wrap">
                <p>Financial tools to grow your wealth - stake</p>
                <p>and earn compounding interest</p>
            </div>
        </div>
    );
}

export default Main;
