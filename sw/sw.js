const CACHE_NAME = 'hiyoko_ver2';
const urlsToCache = [
	'./index.html',
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
	if (event.request.url.endsWith('chikuwa-hiyoko.png')) {
		event.respondWith(
			fetch('../hisyou.png').catch(error => self.caches.match('halo_image8.png'))
		);
	} else {
		event.respondWith(
			self.caches.match(event.request).then(response => {
				if (response)
					return response;
				return fetch(event.request);
			})
		);
	}
*/

	event.respondWith(
			return fetch("<html><h1>HELLO!!WORLD</h1></html>");
	);
});
