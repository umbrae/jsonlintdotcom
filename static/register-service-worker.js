/* eslint-disable prefer-arrow-callback, no-console */
if (navigator.serviceWorker) {
    navigator.serviceWorker.register('service-worker.js').then(function done() {
        console.log('CLIENT: service worker registration complete.');
    }, function c(e) {
        console.error(e);
    });
}
