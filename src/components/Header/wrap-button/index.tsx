import React, { useState } from "react";
import "./wrap-button.scss";
import Wrap from "../../../components/Wrap";
import { useTranslation } from "react-i18next";

function WrapButton() {
    const { t } = useTranslation();
    const [showWrap, setShowWrap] = useState(false);

    const handelOpenWrap = () => {
        setShowWrap(true);
    };

    const handelCloseWrap = () => {
        setShowWrap(false);
    };

    return (
        <div>
            <div className="wrap-button" onClick={handelOpenWrap}>
                <p>{t("Wrap")}</p>
            </div>
            <Wrap open={showWrap} handleClose={handelCloseWrap} />
        </div>
    );
}

export default WrapButton;
