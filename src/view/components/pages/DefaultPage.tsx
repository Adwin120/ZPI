import React from "react";
import { useRole } from "../../firebaseAuth";
import CommonLayout from "../layout/CommonLayout";
import { Redirect } from "wouter";

const DefaultPage: React.FC = () => {
    const [role] = useRole();
    if (role === "pracownik") {
        return <Redirect to="/panel/pracownik/profil" replace/>
    }
    if (role === "klient") {
        return <Redirect to="/panel/klient/profil" replace/>
    }
    if (role) {
        return <Redirect to="/panel/auta" replace/>
    }
    return <CommonLayout subpageTitle=""/>

}

export default DefaultPage;