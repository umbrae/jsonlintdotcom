// parses URL
export default function parseQuery() {
    const search = location.search;
    const query = {};
    const parts = search.substr(1).split('&');

    if (!search) {
        return query;
    }

    for (const part of parts) {
        const [key, value] = part.split('=');
        query[decodeURIComponent(key)] = decodeURIComponent(value || null);
    }

    return query;
}
