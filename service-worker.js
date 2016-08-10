/* eslint-disable no-console */
self.addEventListener('install', event => {
    console.log('WORKER: install event in progress.');
    event.waitUntil(
        caches
        .open('v1')
        .then(cache =>
            fetch('chunks.json')
                .then(resp => resp.json())
                .then(chunks => cache.addAll([
                    '/',
                    '/css/style.css',
                    '/css/codemirror.css',
                    '/img/jsonlint-logo.png'
                ].concat(chunks)))
        )
        .then(() => {
            console.log('WORKER: install completed');
        })
        .catch(console.error.bind(console))
    );
});

self.addEventListener('fetch', event => {
    console.log('WORKER: fetch event in progress.');

    if (event.request.method !== 'GET') {
        return;
    }
    event.respondWith(
        caches
        .match(event.request)
        .then(cached => fetch(event.request).catch(() => cached))
    );
});
