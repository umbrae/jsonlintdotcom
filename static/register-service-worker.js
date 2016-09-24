(function() {
    const serviceWorkerName = 'service-worker.js';
    function registerServiceWorker() {
        return navigator.serviceWorker.register(serviceWorkerName).then(function() {
            console.log('CLIENT: service worker registration complete.');
        }, function(e) {
            console.error(e);
        });
    }

    fetch('chunks.json').then(function(resp) {
        return resp.text();
    }).then(function(chunksText) {
        if(localStorage.chunksText !== chunksText) {
            navigator.serviceWorker.getRegistrations().then(function(registrations) {
                Promise.all(
                    registrations.map(function(registration) {
                        return registration.unregister();
                    })
                ).then(function() {
                    location.reload();
                });
            });

            localStorage.chunksText = chunksText;
        } else {
            registerServiceWorker();
        }
    });
})();
