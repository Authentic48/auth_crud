<h1 align="center"> Auth CRUD </h1> <br>

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Quick Start](#quick-start)
- [API](#requirements)

## Features

Node_entrance_test:  Description of features 
* authentication and authorization with JWT token
* read, update single user profile
* read all users with pagination

## Requirements
This application can run locally using: 

### NodeJs  Express  Typescript

## Api 

## register 
### Request 
`POST '/api/users/register'`
### Response

``` 
{
 'id': 'id',
 'name': 'name',
 'email': 'email',
 token: jwt-token
}
```

## login 
### Request 
`POST '/api/users/login'`
### Response

``` 
{
 'id': 'id',
 'firstName': 'name',
 'lastName': 'last name'
 'email': 'email',
 'gender': 'male/female',
 'dateOfRegistration': 'date',
 'photoUrl': 'imagePath'
 token: jwt-token
}
```

## display profiles 
### Request 
`GET '/api/profile?page=&size=`
### Response

``` 

'count': "",
'row': 
[
{
  'id': 'id',
 'firstName': 'name',
 'lastName': 'last name'
 'email': 'email',
 'gender': 'male/female',
 'dateOfRegistration': 'date',
 'photoUrl': 'imagePath'
 token: jwt-token
}
]

```

## get profile by id  
### Request 
`GET '/api/profile/:id`
### Response

``` 
{
 'id': 'id',
 'firstName': 'name',
 'lastName': 'last name'
 'email': 'email',
 'gender': 'male/female',
 'dateOfRegistration': 'date',
 'photoUrl': 'imagePath'
 
}
```


## Update profile  
### Request 
`PUT '/api/profile/:id`
### Response

``` 
{
 'id': 'id',
 'firstName': 'name',
 'lastName': 'last name'
 'email': 'email',
 'gender': 'male/female',
 'dateOfRegistration': 'date',
 'photoUrl': 'imagePath'
 
}
```
