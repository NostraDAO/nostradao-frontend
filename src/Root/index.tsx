import React, {useEffect, useState} from "react";
import App from "./App";
import Landing from "./Landing";
import {HashRouter} from "react-router-dom";
import {loadTokenPrices} from "../helpers";
import Loading from "../components/Loader";
import "../i18n/config";

function Root() {
    const isApp = (): boolean => {
        // if (window.location.hash !== " ") {
        //     return true;
        // }
        return true; //window.location.host.includes("app");
    };
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadTokenPrices().then(() => setLoading(false));
    }, []);

    if (loading) return <Loading />;

    const app = () => (
        <HashRouter>
            <App />
        </HashRouter>
    );

    return isApp() ? app() : <Landing />;
}

export default Root;
