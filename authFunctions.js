//Used to login returning users
function login(email, password, isNewUser, name) {
    mRef.authWithPassword({
        email   : email,
        password: password
    }, function(error, authData) {
        if(error) {
            console.log("Login Failed!", error);
        } else {
            console.log("Authenticated successfully with payload:", authData)
            if(isNewUser) {
                successCreated(email,name,authData);
            }
        }
    });
}
    
//Used when creating new users
function createAccount(email, password, name) {
    var success = false;
    mRef.createUser({
        email: email,
        password: password
    }, function(error, userData) {
        if (error) {
            switch (error.code) {
                case "EMAIL_TAKEN":
                    console.log("The new user account cannot be created because the email is already in use.");
                    break;
                case "INVALID_EMAIL":
                    console.log("The specified email is not a valid email.");
                    break;
                default:
                    console.log("Error creating user:", error);
            }
        } else {
            console.log("Successfully created user account with uid:", userData.uid);
            login(email,password,true,name);
            
        }
    });
}

function successCreated(email, name, authData) {
    mRef.child("Users").push({
        EmailAddress: email,
        Name: name,
        UserID: authData.uid
    });
}