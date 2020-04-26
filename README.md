# A back-end for a customer service chat
dependencies: docker, npm 

after installing docker locally, do the following before starting the app : 

start redis server:
```
docker run --name whatwapp-redis -p 16379:6379 -d redis:3.2.4
```

the file config.js already contains the right configuration, binding redis port to 16379 on localhost.

next install dependencies via yarn or npm:
```
npm install
```
or
```
yarn install
```

start the project :
```
npm start
```
or
```
yarn start
```

test operator user login:
email: joe@whatwapp.com
password: password


test client user login:
email: bilbo@gmail.com
password: password

user seeds are found in seed.js, seed can be eventually re-run with 
```
node seed.js
```

