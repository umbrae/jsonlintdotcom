// makes request to external resource via php proxy
export default function fetchExternal(url, success, error) {
    const req = new window.XMLHttpRequest();
    req.onreadystatechange = () => {
        if (req.readyState === window.XMLHttpRequest.DONE) {
            if (req.status === 200) {
                const resp = JSON.parse(req.responseText);
                if (resp.error) {
                    // if proxy returns error call error callback
                    error(resp.result);
                } else {
                    // else everything is awesome
                    success(resp.content);
                }
            } else {
                // if status is not 200 call error callback
                error(req.statusText || 'Unable to connect');
            }
        }
    };

    req.open('POST', 'proxy.php');
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    req.send(`url=${encodeURIComponent(url)}`);

    return this;
}
