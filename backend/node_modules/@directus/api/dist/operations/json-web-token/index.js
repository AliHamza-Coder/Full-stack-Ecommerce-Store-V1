import { defineOperationApi } from '@directus/extensions';
import { optionToObject, optionToString } from '@directus/utils';
import jwt from 'jsonwebtoken';
export default defineOperationApi({
    id: 'json-web-token',
    handler: async ({ operation, payload, token, secret, options }) => {
        if (operation === 'sign') {
            if (!payload)
                throw new Error('Undefined JSON Web Token payload');
            if (!secret)
                throw new Error('Undefined JSON Web Token secret');
            const payloadObject = optionToObject(payload);
            const secretString = optionToString(secret);
            const optionsObject = optionToObject(options);
            return jwt.sign(payloadObject, secretString, optionsObject);
        }
        else if (operation === 'verify') {
            if (!token)
                throw new Error('Undefined JSON Web Token token');
            if (!secret)
                throw new Error('Undefined JSON Web Token secret');
            const tokenString = optionToString(token);
            const secretString = optionToString(secret);
            const optionsObject = optionToObject(options);
            return jwt.verify(tokenString, secretString, optionsObject);
        }
        else if (operation === 'decode') {
            if (!token)
                throw new Error('Undefined JSON Web Token token');
            const tokenString = optionToString(token);
            const optionsObject = optionToObject(options);
            return jwt.decode(tokenString, optionsObject);
        }
        throw new Error('Undefined "Operation" for JSON Web Token');
    },
});
