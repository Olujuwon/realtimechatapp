import {useEffect, useState, useCallback} from "react";

import userSigninType, {useSigninUserMutation} from "../redux/appQueryV1";
import useEncryptionOperations from "./useEncryptionOperations";

import {getAuth, signOut} from "firebase/auth";

import Cookies from 'js-cookie';

const useManageAuthUser = () => {
    const [signinUser] = useSigninUserMutation();
    const [user, setUser] = useState<any>(null);
    const {handleDecryptData, handleEncryptData} = useEncryptionOperations();
    // @ts-ignore
    const SECRET_KEY: string = process.env.REACT_APP_APP_ID;
    const handleSigninUser = useCallback(async (userData: userSigninType) => {
        try {
            const signUserIn: any = await signinUser({
                email: userData.email, password: userData.password
            } as userSigninType);
            if (!signUserIn.error) {
                const encryptUserData = handleEncryptData({
                    data: {
                        email: signUserIn.data.email,
                        uid: signUserIn.data.uid
                    }, secret: SECRET_KEY
                })
                const cookieExpires = Number(process.env.REACT_APP_APP_COOKIE_EXPIRES); //30Minutes
                Cookies.set("real-time-chat-user-v1", encryptUserData, {expires: cookieExpires});
                setUser(signUserIn.data);
                return {data: signUserIn.data};
            } else {
                // @ts-ignore
                console.error(signUserIn.error);
                return {error: signUserIn.error}
            }
        } catch (error: any) {
            return {error: error};
        }
    }, [])

    const isUserLoggedIn = useCallback(() => {
        return Cookies.get("real-time-chat-user-v1") !== undefined;
    }, [])

    const handleLoggingOffAuthUser = useCallback(async () => {
        const auth = getAuth();
        try {
            await signOut(auth);
            Cookies.remove("real-time-chat-user-v1");
            window.location.replace("/");
        } catch (e) {
            alert("Error signing out!");
        }
    }, [])

    const handleSetAuthenticatedUser = useCallback(() => {
        if (isUserLoggedIn()) {
            const decryptedUserData = handleDecryptData({
                cipherText: Cookies.get("real-time-chat-user-v1") as string,
                secret: SECRET_KEY
            });
            setUser(decryptedUserData);
        } else {
            setUser("Not authenticated");
        }
    }, [])

    useEffect(() => {
        if (user === null) handleSetAuthenticatedUser();
    }, [user])

    return {
        authenticatedUser: user,
        handleSigninUser,
        isUserLoggedIn,
        handleLoggingOffAuthUser
    };
}

export default useManageAuthUser;
