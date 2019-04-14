import validator from 'validator';
import xss from 'xss';

export const checkUsername = username => {
    return validator.isAlphanumeric(xss(username));
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