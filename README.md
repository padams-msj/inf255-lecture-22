# lecture-22

INF255 starter for Lecture 23: the Animal Shelter app, its Express server, and its SQLite database as they stood at the end of Lecture 22. The form now sends new animals to the server, and the server checks them before saving.

```sh
npm install
node seed.js
```

Terminal 1, the API:

```sh
node --watch server.js
```

Terminal 2, the Vue app:

```sh
npm run dev
```

Run `node seed.js` again at any time to reset the database to the original 6 animals.
