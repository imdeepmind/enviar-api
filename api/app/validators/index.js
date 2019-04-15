import validator from 'validator';
import xss from 'xss';
import mongoose from 'mongoose';

export const checkID = id => {  
    return mongoose.Types.ObjectId.isValid(id);
}

export const checkUsername = username => {
    return validator.isAlphanumeric(xss(username));
}

export const checkPassword = password => {
    return validator.isLength(password, {min:4, max:24});
}

export const checkName = name => {
    return validator.isAlphanumeric(xss(name));
}

export const checkEmail = email => {
    return validator.isEmail(xss(email));
}

export const checkDob = dob => {
    return validator.isBefore(xss(dob));
}

export const checkGender = gender => {
    return validator.isIn(xss(gender.toLowerCase()), ['m', 'f', 'o'])
}