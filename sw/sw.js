const CACHE_NAME = 'hiyoko_ver2';
const urlsToCache = [
	'./index.html',
	'./halo_image8.png'
];

//�o�^����
self.addEventListener('install', (event) => {
	event.waitUntil(
	caches.open(CACHE_NAME)
	  .then((cache) => {
		console.log('Opened cache');
	  
		  // �w�肳�ꂽ���\�[�X���L���b�V���ɒǉ�����
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
				// �Â��L���b�V���͍폜����
				if (cacheWhitelist.indexOf(cacheName) === -1) {
					return caches.delete(cacheName);
				}
			})
			);
		})
	);
});

self.addEventListener('fetch', (event) => {
	console.log("�Ƃ��Ă��Ă�́F",event.request)
	if (event.request.url.endsWith('chikuwa-hiyoko.png')) {
		event.respondWith(
			fetch('../hisyou.png').catch(error => self.caches.match('halo_image8.png'))
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
