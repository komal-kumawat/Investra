## Backend
1. create a Backend folder 
2. npm init -y 
3. tsc --init
4. npm i 
5. in tsconfig.json:
```
 "/rootdir":"./src" 
 "/outdir":"./dist"

 ```
6. in package.json : 
```     
"start": "node src/server.js",
"build": "tsc -b",
"dev": "npm run build && npm start" 
```

7. Create a src folder
8. in src folder create a server.ts ans write basic express code and connect with mongoDB
9. create a schema folder and create
```
1. HoldingSchema : {name , quantity , price , avg , net , day}
2. OrdersSchema : {name , quantity , price , mode}
3. Positionschema : {product , name , quantity , avg , price , net , day , isLoss}
4. UserSchema : {username , password}



```
10. Also create their models
11. In server.ts :
- write login regestration code 
- AuthMiddleware
- write get route for : allHoldings , allPositions  ans post route for newOrder but authorise them using AuthMiddleware 
