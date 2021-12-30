# express-mongodb

A Restful CRUD API for the user having below listed
fields for User schema.
* name
* email
* password (must be 10 digit alphanumeric)
* about
* mobile (10 digits)
* _id

The following API endpoints are
1. Create a user (name, email, password, about, mobile)
2. Login a user (email and password)
3. Update a user (cannot update email)
4. Get a user (using userId or _id)
5. Delete a user (using userId or _id)
6. Get the list of users

From 3-6, operations is operatable on secure routes if
valid JWT is present.

### Download
```
git clone 
```
