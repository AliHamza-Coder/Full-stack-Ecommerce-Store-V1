// a simple util for building a message object
export const fmtMessage = (type, data = {}, uid) => {
    const message = { type, ...data };
    if (uid !== undefined) {
        message['uid'] = uid;
    }
    return JSON.stringify(message);
};
// we may need this later for slow connections
export const safeSend = async (client, data, delay = 100) => {
    if (client.readyState !== client.OPEN)
        return false;
    if (client.bufferedAmount > 0) {
        // wait for the buffer to clear
        return new Promise((resolve) => {
            setTimeout(() => {
                safeSend(client, data, delay).then((success) => resolve(success));
            }, delay);
        });
    }
    client.send(data);
    return true;
};
// an often used message type extractor function
export const getMessageType = (message) => {
    return typeof message !== 'object' || Array.isArray(message) || message === null ? '' : String(message.type);
};
