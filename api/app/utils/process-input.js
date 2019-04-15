import xss from 'xss';

import logger from './logger';
import jsonWriter from './json-writer';
import {
    checkName, checkUsername, checkEmail, checkGender, checkDob
} from '../validators';

export default (input, res, type, title='',) => {
    let cleaned_input = xss(input);
    let isError = false;

    if (title != '')
        title = type;
    
    switch(type){
        case 'name':
            if (!checkName(cleaned_input)){
                logger.debug(`${cleaned_input} is invalid ${title}`);
                isError = true;
            }
            break;
        case 'email':
            if (!checkEmail(cleaned_input)){
                logger.debug(`${cleaned_input} is invalid ${title}`);
                isError = true;
            }
            break;
        case 'username':
            if (!checkUsername(cleaned_input)){
                logger.debug(`${cleaned_input} is invalid ${title}`);
                isError = true;
            }
            break;
        case 'gender':
            if (!checkGender(cleaned_input)){
                logger.debug(`${cleaned_input} is invalid ${title}`);
                isError = true;
            }
            break;
        case 'dob':
            if (!checkDob(cleaned_input)){
                logger.debug(`${cleaned_input} is invalid ${title}`);
                isError = true;
            }
            break;
    }

    if (isError) {
        jsonWriter(`The ${input} is invalid for the field ${title}`, 401, res);
    } else {
        return cleaned_input;
    }
}