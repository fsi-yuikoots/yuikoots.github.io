const CACHE_NAME = 'hiyoko_ver2';
const urlsToCache = [
	'./hiyoko.html',
	'./halo_image8.png'
];

//登録処理
self.addEventListener('install', (event) => {
	event.waitUntil(
	caches.open(CACHE_NAME)
	  .then((cache) => {
		console.log('Opened cache');
	  
		  // 指定されたリソースをキャッシュに追加する
		  return cache.addAll(urlsToCache);
	  })
	);
});

self.addEventListener('activate', (event) => {
var cacheWhitelist = [CACHE_NAME];

event.waitUntil(
	caches.keys().then((cacheNames) => {
		return Promise.all(
			cacheNames.map((cacheName) => {
				// 古いキャッシュは削除する
				if (cacheWhitelist.indexOf(cacheName) === -1) {
					return caches.delete(cacheName);
				}
			})
			);
		})
	);
});

self.addEventListener('fetch', (event) => {
/*
	event.respondWith(
	caches.match(event.request)
	  .then((response) => {
		  if (response) {
		  	return response;
		  }

		let fetchRequest = event.request.clone();

		return fetch(fetchRequest).then((response) => {
			if (!response || response.status !== 200 || response.type !== 'basic') {
				return response;
			}

			let responseToCache = response.clone();

			caches.open(CACHE_NAME).then((cache) => {
				cache.put(event.request, responseToCache);
			});

			return response;

			});
		})
	);
*/
	if (event.request.url.endsWith('index.html')) {
		event.respondWith(
			fetch('index.html').catch(error => self.caches.match('./hiyoko.html'))
		);
	} else {
		event.respondWith(
			self.caches.match(event.request).then(response => {
				if (response)
					return response;
				console.log("Worker: No response", event.request);
				return fetch(event.request);
			})
		);
	}
});
