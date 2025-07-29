export const isValidUrl = (url) => {
    try {
        new URL(url);
        return true;
    }   catch {
        return false;
    }
};
export const logEvent = (event, details = {}) =>
{
    console.log('[LOG]: ${event}', details);
};