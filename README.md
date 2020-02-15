# JSON Web Token using Node.js

Simple implementation of JWT verification server using Node.js.


## POST /token

### Correct

* Request

```json
{
  "id":"userId",
  "pw":"thisIsPassword"
}
```

* Response

```json
{
  "auth": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXJJZCIsInNvbWVEYXRhIjoiYW55dGhpbmdIZXJlIiwiaWF0IjoxNTgxNzMyNTgxLCJleHAiOjE1ODIzMzczODF9.9g_AZDsFuz-EW_qxVYkxIHBFiTXtKbjYcyiaj5_Ndgk"
}
```

### Wrong

* Request

```json
{
  "id":"userId",
  "pw":"wrongPassword"
}
```

* Response

```json
{
  "auth": false
}
```


## POST /check

### Correct

* Request

```json
{
  "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXJJZCIsInNvbWVEYXRhIjoiYW55dGhpbmdIZXJlIiwiaWF0IjoxNTgxNzMyNTgxLCJleHAiOjE1ODIzMzczODF9.9g_AZDsFuz-EW_qxVYkxIHBFiTXtKbjYcyiaj5_Ndgk"
}
```

* Response

```json
{
  "id": "userId",
  "someData": "anythingHere",
  "iat": 1581732581,
  "exp": 1582337381,
  "auth": true
}
```

### Wrong

* Request

```json
{
  "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.wrongCI6InVzZXJJZCIsInNvbWVEYXRhIjoiYW55dGhpbmdIZXJlIiwiaWF0IjoxNTgxNzMyNTgxLCJleHAiOjE1ODIzMzczODF9.9g_AZDsFuz-EW_qxVYkxIHBFiTXtKbjYcyiaj5_Ndgk"
}
```

* Response

```json
{
  "auth": false
}
```
