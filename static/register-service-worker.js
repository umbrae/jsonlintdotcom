navigator.serviceWorker.register('service-worker.js').then(function() {
    console.log('CLIENT: service worker registration complete.');
}, function(e) {
    console.error(e);
});
