var cacheName = 'gdg-codedlab-cache-v1';
var filesToCache = [
	'/',
	'/index.html',
	'/css/app.css',
	'/css/bootstrap.min.css',
	'/css/font-awesome.min.css',
	'/css/material.indigo-pink.min.css',
	'/img/nn.min.png',
	'/utilities/js/app.js',
	'/toast/build/toastr.min.js',
	'/utilities/js/jquery-1.11.2.js',
	'/utilities/js/bootstrap.min.js',
	'https://fonts.googleapis.com/icon?family=Material+Icons',
	'https://fonts.googleapis.com/css?family=Lobster'
];

self.addEventListener('install', function(reg) {
	reg.waitUntil(
		caches.open(cacheName).then(function(cache){
			console.log("[Service Worker] Caching App Shell");
			return cache.addAll(filesToCache);
		})
	)
});

self.addEventListener('fetch', function(event){
	console.log(event.request.url);
	event.respondWith(
		caches.match(event.request).then(function(response) {
			return response || fetch(event.request);
		})
	)
});

self.addEventListener('activate',function(event){
	caches.keys().then(function(keylist){
		return Promise.all(keylist.filter(function(cache) {
			return cache.startsWith('lemz-') && cache != cacheName;
		}).map(function(key){
			if(key != cacheName) {
				return caches.delete(key);
			}
		}))
	})
});

self.addEventListener('push', function (event) {
	console.log('Push message received', event);
	var title = 'Push Message';
	// Show notification
	event.waitUntil(
		self.registration.showNotification(title, {
			body: 'The Message',
			icon: 'img/nn.min.png',
			tag: 'my-tag'
		})
	);
});

self.addEventListener('notificationclick', function (event) {
	console.log('Notification click: tag', event.notification.tag);
	event.notification.close();
	var url = 'https://attending.io/events/buildpwa-v2';
	event.waitUntil(
		clients.matchAll({
			type: 'window'
		}).then(function (windowClients) {
			windowClients.forEach(function (client) {
				if (client.url == url && 'focus' in client) {
					return client.focus();
				}
			});
			if (clients.openWindow) {
				return clients.openWindow(url);
			}
		})
	);
});