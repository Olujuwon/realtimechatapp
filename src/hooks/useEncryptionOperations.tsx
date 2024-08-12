import {useCallback} from "react";

import * as cryptoJs from 'crypto-js';

interface IEncryptData {
    data: unknown;
    secret: string;
}

interface IDecryptData {
    cipherText: string;
    secret: string;
}

const useEncryptionOperations = () => {

    const handleEncryptData = useCallback(({data, secret}: IEncryptData) => {
        return cryptoJs.AES.encrypt(JSON.stringify(data), secret).toString();
    }, [])

    const handleDecryptData = useCallback(({cipherText, secret}: IDecryptData) => {
        const bytes = cryptoJs.AES.decrypt(cipherText, secret);
        return JSON.parse(bytes.toString(cryptoJs.enc.Utf8));
    }, [])

    return {handleEncryptData, handleDecryptData};
}

export default useEncryptionOperations;