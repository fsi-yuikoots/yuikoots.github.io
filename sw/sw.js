const CACHE_NAME = 'hiyoko_ver2';
const urlsToCache = [
	'./index.html',
	'./chikuwa-hiyoko.png'
	,'./hiyoko.html'
];

//登録処理
self.addEventListener('install', (event) => {
	event.waitUntil(
	caches.open(CACHE_NAME)
	  .then((cache) => {
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
});
