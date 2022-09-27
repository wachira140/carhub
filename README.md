# USER

super user
merchants
users
[x] - name
[x] - email
[x] - password
[x] - is_verified
[x] - verification date
[x] - verification token
[x] - password token
[x] - password expiration date
[x] - role
**merchants**

required: funxtion(){
return this.role == 'merchant' || this.role == 'super user' ? true : false
}

[x] - country
[x] - city
[x] - location
[x] - address
[x] - contacts
[x] - socials[]
[x] - website
[x] - type - importer, local dealer
[x] - subscription (bool)

# Authentication

**register**
[x] - check if name or email or password exists in the req.body
[x] - check if email exists in db
[x] - create verification token
[] - send verification email
[x] - create user in db

**login**
[x] - check if email and password exists
[x] - check if user exists
[x] - compare the password
[x] - check if user is verified
[] - respond with cookies

**forgot password**
[x] - check email in req.body
[x] - check user by email
[x] - create passwordtoken
[x] - create password tokenexpiration date
[] - send password reset email
[x] - update password token in db
[x] - update password tokenexpiration date in db

**reset password**
[x] - get passwordtoken, email, and password from req.body
[x] - find the user in db
[x] - compare passwordtoken from db
[x] - check if pasword token is expired
[x] - password = newpassword
[x] - set passwordtoken = ''
[x] - set passwordtokenexpiration date = ''
[x] - save user

**logout**
[] - findoneAndDelete from req.user
[] - delete cookies



**update user**
[] - check if required fields are empty
[] - check if user is authorized -req.user
[] - update the details


<!-- 
like/follow yard 
receive notification for certain car models
review
block yard
block user
list followers

-->
# FOLLOWSHP
[] - followers schema
 - current user
 - follower
 - type of follower('merchant' 'user')
 - name
 * if type === 'merchant? link to user
 **folowUser**
 [] - get user to follow from req.params
 [] - find if user is available in db
 [] - if user does not exist create new user with current follower
 [] - if exists check if you follow this user. if not update the user.followers with a new follower



# carhub
