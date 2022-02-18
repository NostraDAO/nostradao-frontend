import React from "react";
import "./background.scss";
import BlobsTop from "../../../../assets/icons/landing-blobs-top.png";
import BlobsCenter from "../../../../assets/icons/landing-blobs-center.png";
import Gangster from "../../../../assets/icons/gangster.jpg";
function Background() {
    return (
        <div className="landing-background">
            <div className="landing-background-blobs-top">
                <img alt="" src={BlobsTop} />
            </div>
            <div className="landing-background-wrapper">
                <img alt="" src={Gangster} style={{filter: "blur(2px)"}} />
            </div>
        </div>
    );
}

export default Background;
