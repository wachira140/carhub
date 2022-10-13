Carhub is an E-commerce motor-vehicle and services related to them
the project is comprised of the latest technologies. ie backend - nodejs & express js and other external libraries.
# challenges
i built this project with the gathered knowldge of a self taught developer. the project took some time to actualize as i had at some point to hold inorder to learn a new thing that needs to be implemented (i miss teamwork)




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
 [x] - get user to follow from req.params
 [x] - check if the req.params.id is same as req.user ## not to follow yourself
 [x] - check the current user (req.user) from the followers schema.
 [x] - if the user exists
    - check if the follower already exists in the followers array
    - if not, add the new follower to the followers array
[x] - if user doesnt exists
    - create the user
    - add the req.user to the followers array

**unfollowUser**
[x] - get the userid from req.params
[x] - filter the followers array and return the new array without the follower
[x] - update the followers array

**blockUser**
[x] - get user from req.params
[x] - check if you have a followers/blocked schema
[x] - if exists, add the new user to the blocked list
[x] - if doesnt exists, create new and add the user to the blocked users array

**unblockUser**
[x] - get the user from req.params
[x] - filter the blocked users, return the new blocked users without the req.params.id from the new array and update.

**viewwhoFollows**
[x] - view who follows you
        - followers.followers

**viewYourFollowing**
[x] - get all users
[x] - loop through the followersSchema followers array and get every user who i follow
[x] - get each user from the Users schema

**sendFollowRequest**
[x] - send request to the user through req.params
[x] - check if you already follow the user or blocked by the user
[x] - send request to the user and send notification email to the user
 
 # Payments
 **payActivation**
 [] - get item id's from req.body
 [] - find if the id exists in the motorsschema
 [] - confirm the amount to be charged and multiply with the number of products/items
 [] - send the amount to be charged to mpesa
    **Till**
    update amount to the db and send the prompt to the subscribers phone
    **Paybill**
    - generate account name
    - check if the generated account name == name supplied on payments
    - check if amount paid is less than amount to be paid
    - update items to active
    - update subscription_time:Date.now()





