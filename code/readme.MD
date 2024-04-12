## Electron
To publish to Steam I would need a binary. I used Electron to run Node and serve the game natively.

``` javascript
function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 768,
    height: 432,
    useContentSize: true,
    title: "NH Bid at MSCYPAA",
    backgroundColor: '#000000',
    icon: __dirname + "/ms-store-icon.png",
    webPreferences: {
      // Allow Node.js API access in renderer process, as long
      // as we've not removed dependency on it and on "@electron/remote".
      nodeIntegration: true,
      contextIsolation: false,
    }
  });
```

Ultimately, the window was pointed at index.html to start the application.
``` javaScript 
 mainWindow.loadFile("app/index.html");
````
## Gdevelop

## XBOX and PS4

![](https://github.com/mkostandin/mkostandin/blob/main/mscy-screen.png)

## Offline PWA/Service Worker

For the PWA service worker, the caching strategy chosen was StaleWhileRevalidate. The cached offline version will be used unless the server has something newer, and then the cache is updated. This allows for a snappy application that will just look at the server to see if the service worker version has changed. Surprisingly, the entire HTML5 GDevelop game engine can work offline as a cached PWA pretty well.

Worbox was used because it simplifies the generation of service workers and the implementation of caching strategies.
``` javascript
importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
);

self.addEventListener('fetch', event => {
  if (event.request.url.endsWith('.png')) {
    const cacheFirst = new workbox.strategies.StaleWhileRevalidate();
    event.respondWith(cacheFirst.handle({request: event.request}));
  }
});
```
## Steam
With the time limit I had, the difficulty with Steam is you need to purchase an App Credit. It is $100. You must own the App Credit for 30 days before the Game can be published. I didn't know this. I bought the credit on July 18th, so August 17th was the earliest the game would be on Steam. That was the day before the conference!

Additionally, the game must be packaged and approved with the store listing submitted for two weeks for customers to see as "coming soon" before release. I handled this by creating a simple first version of the game and submitting it immediately to all the stores. GDevelop is a no-code platform and it was easy enough to learn. So by July 18th, a version was being reviewed in all the stores including Steam not long after. The game is a PWA, so I could completely change it later without needing updates after working out compliance and policy issues with Apple and Google. Since I would need to create a binary with Electron for Steam, I could not update the game to the final version in the same way with the live PWA. I would need to stay on top of it for the month so that at least a compiled Electron version hit Steam at least two weeks before August 17th.
