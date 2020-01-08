import localization from '../localization/localization';


const validateFirstName = (firstName)=>{
    console.log("firstName: " + firstName);
    return firstName.length==0?localization.firstNameErrorMsg:null;
}

const validateLastName = (lastName)=>{
    console.log("lastName: " + lastName);
    return lastName.length==0?localization.lastNameErrorMsg:null;
}

const validateEmail = (email)=>{
    console.log("email: " + email);
    let mailReg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return !mailReg.test(String(email).toLowerCase())?localization.emailErrorMsg:null;
}

const validatePhone = (phone)=>{
    console.log("phone: " + phone);
    return !isNaN(phone) && phone.length >= 10 ?null:Localization.lhoneErrorMsg;
}

const validatePasswordAndConfirm = (password, passwordConfirm)=>{
    console.log("password: " + password + "passwordConfirm: " + passwordConfirm);
    return password != passwordConfirm ? localization.passwordDontMatchErrorMsg:null;
}

const validatePassword = (password)=>{
    console.log("password: " + password);
    return password.length<6?localization.passwordErrorMsg:null;
}

const validatePasswordConfirm = (passwordConfirm)=>{
    console.log("passwordConfirm: " + passwordConfirm);
    return passwordConfirm.length<6?localization.passwordConfirmErrorMsg:null;
}

export {
    validateFirstName,
    validateLastName,
    validateEmail,
    validatePhone,
    validatePassword,
    validatePasswordAndConfirm,
    validatePasswordConfirm,
}