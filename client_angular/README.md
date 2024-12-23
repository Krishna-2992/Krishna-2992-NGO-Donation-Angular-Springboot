# NGO Donation

## Interfaces: 
1. **User**(userId, name, phone, email, address, loginName, password, role, panNumber)
2. **LoginUser**(loginName, password)

## Pages: 
1. **Login**: 
    * with loginName and password. 
    * hits userService.loginUser
2. **Register**: 
    * with name, phone, email, address, loginName, password, role, panNumber
    * hits userService.registerUser 

## Components: 
1. **Navbar**

## Services: 
1. **UserService**: 
    * loginUser
    * registerUser
    * logoutUser
    * (getUserData): loginUser's helper
    * (setUserData): registerUser's helper
    * (getUser): To retreive the user set in this object user signal(logged In user)