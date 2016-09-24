// parses URL
export default function parseQuery() {
    const { hash } = location;
    const query = {};
    const parts = hash.replace('#', '').split('&');

    if (!hash) {
        return query;
    }

    for (const part of parts) {
        const [key, value] = part.split('=');
        query[decodeURIComponent(key)] = decodeURIComponent(value || null);
    }

    return query;
}
