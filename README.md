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
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXJJZCIsImlhdCI6MTU3OTU2NjY2NiwiZXhwIjoxNTgwMTcxNDY2LCJpc3MiOiJpc3N1ZWRCeSIsInN1YiI6InVzZXJJbmZvIn0.Ag4WynaTUJaUY-FAI6l4IMHOyIySj4CkU-N0IwWkFHQ"
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
  "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXJJZCIsImlhdCI6MTU3OTU2NjY2NiwiZXhwIjoxNTgwMTcxNDY2LCJpc3MiOiJpc3N1ZWRCeSIsInN1YiI6InVzZXJJbmZvIn0.Ag4WynaTUJaUY-FAI6l4IMHOyIySj4CkU-N0IwWkFHQ"
}
```

* Response

```json
{
  "id": "userId",
  "iat": 1579566666,
  "exp": 1580171466,
  "iss": "issuedBy",
  "sub": "userInfo",
  "auth": true
}
```

### Wrong

* Request

```json
{
  "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXJJZCIsImlhdCI6MTU3OTU2NjY2NiwiZXhwIjoxNTgwMTcxNDY2LCJpc3MiOiJpc3N1ZWRCeSIsInN1YiI6InVzZXJJbmZvIn0.wrongnaTUJaUY-FAI6l4IMHOyIySj4CkU-N0IwWkFHQ"
}
```

* Response

```json
{
  "auth": false
}
```
