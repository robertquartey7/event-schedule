// api/v1.0.0/user
// api/v1.0.1/user ->patch (bugfix, mostly app internal changes)
// api/v1.1.0/user ->minor (bugfixes, non-mandatory additions to request/response)
// api/v2.0.0/user ->major (breaking changes, ex. manadoroty changes to request/response, changes to auth, changes to headers etc)
// api/v3.0.0/user

//v1    . 0 .   1
//major minor patch

// curl http://localhost:8000/api/v1.0.0/user
// -H "Authorization: Basic TOKEN_HERE"

// curl http://localhost:8000/api/v2.0.0/user
// -H "Authorization: Bearer TOKEN_HERE"

// curl http://localhost:8000/api/user
// -H "X-API-VERSION: v1.0.0"
// -H "Authorization: Basic TOKEN_HERE"

// curl http://localhost:8000/api/user
// -H "X-API-VERSION: v2.0.0"
// -H "Authorization: Bearer TOKEN_HERE"
