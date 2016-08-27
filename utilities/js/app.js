(function(){
	if (navigator.serviceWorker) {
		navigator.serviceWorker.register('../../gdgcodelab/sw.js').then(function(reg) {
			console.log("[Service Worker] Registered");
		}).catch(function(err) {
			console.log('[Service Worker] Not Registered');
		})
	}
})();