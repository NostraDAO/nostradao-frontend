import React, {useEffect, useState} from "react";
import App from "./App";
import Landing from "./Landing";
import {BrowserRouter} from "react-router-dom";
import {loadTokenPrices} from "../helpers";
import Loading from "../components/Loader";
import "../i18n/config";

function Root() {
    const isApp = (): boolean => {
        if (window.location.href.includes("dashboard") || window.location.href.includes("stake")) {
            console.log("entrou no dashboard");
            return true;
        }
        if (window.location.href.includes("")) {
            console.log("entrou no vazio");
            return false;
        }
        //return true; window.location.host.includes("app");
    };
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadTokenPrices().then(() => setLoading(false));
    }, []);

    if (loading) return <Loading />;

    const app = () => (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );

    return isApp() ? app() : <Landing />;
}

export default Root;
