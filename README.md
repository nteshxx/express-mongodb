A CRUD operation API for the user having below listed
fields for User schema.
* name
* email
* password (must be 10 digit alphanumeric)
* about
* mobile (10 digits) _id

The following API's are
* Create a user (name, email, password, about, mobile)
* Login a user (email and password)
* Update a user (cannot update email)
* Get a user (using userId or _id)
* Delete a user (using userId or _id)
* Get the list of users

From 3-6, operations is operatable on secure routes if
valid JWT is present.
