## Backend
- create a Backend folder 
- npm init -y 
- tsc --init
- npm i 
- in tsconfig.json: "/rootdir":"./src" and "/outdir":"./dist"
- in package.json : ```     "start": "node src/server.js",
    "build": "tsc -b",
    "dev": "npm run build && npm start" ```