import { generatePasswordHash, generateHash, comparePassword  } from '../utils/hash';
import processInput from '../utils/process-input';
import { insert } from '../services/user-service';
import logger from '../utils/logger';
import jsonWriter from '../utils/json-writer';

// export const register = (req, res) => {
//     const data = {
//         username: processInput(req.body.username, res, 'username'),
//         password: req.body.password,
//         name : processInput(req.body.name, res, 'name'),
//         gender: processInput(req.body.gender, res, 'gender'),
//         dob: processInput(req.body.dob, res, 'dob'),
//         country: processInput(req.body.country, res, 'name', 'country'),
//     }

//     insert(data)
//     .then(resp => {
//         logger.info(`User with ${data.username} username account created`);
//         jsonWriter()
//     })
//     .catch(err => {
        
//     })

// }

// insert({
//     "username" : "imdeepmind",
//     "password" : "12345",
//     "name" : "Abhishek Chatterjee",
//     "email" : "infinityatme@gmail.com",
//     "city" : "Guwahati",
//     "state" : "Assam",
//     "country" : "India",
//     "gender" : "m",
//     "dob" : "1997-01-17",
//     "avatar" : "",
//     "status" : "Sample status",
//     "bio" : "Sample bio"
// })