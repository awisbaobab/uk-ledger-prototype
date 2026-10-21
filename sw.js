// UK Ledger service worker. Build 20261021220741 (written by build_v2.py; changes every deploy so browsers see a new SW).
// Network-first (no-store) for HTML and version.json; cache is only an offline fallback.
const C='ukl-20261021220741';
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);if(u.origin!==location.origin)return;
 const html=r.mode==='navigate'||(r.headers.get('accept')||'').includes('text/html');
 if(u.pathname.endsWith('/version.json')){e.respondWith(fetch(r.url,{cache:'no-store'}).catch(()=>caches.match(r)));return}
 if(html){e.respondWith(fetch(r.url,{cache:'no-store',credentials:'same-origin'}).then(res=>{if(res.ok){const c=res.clone();caches.open(C).then(x=>x.put(r,c))}return res}).catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||caches.match('/uk-ledger-prototype/',{ignoreSearch:true}))))}
});
