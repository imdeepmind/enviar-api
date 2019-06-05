import xss from 'xss';
import messages from '../messages';
import logger from '../utils/logger';

export const getImage = (req, res) => {
    req.check('type', 'Invalid type of the image').isString().isIn(['post', 'profile']);
    req.check('resolution', 'Invalid resolution of the image').isString().isIn(['medium', 'small']);
    req.check('file', 'Invalid image link').isString().isLength({min:32, max:33});

    const errors = req.validationErrors();
    if (errors) {
        logger.debug('Validation didn\'t succeed');
        return res.boom.badRequest(messages['m400.2'], errors);
    }

    const type = xss(req.params.type);
    const file = xss(req.params.file);
    const resolution = xss(req.params.resolution);

    let path1 = '';
    if (type === 'post')
        path1 = 'posts';
    else if (type === 'profile')
        path1 = 'images';

    let path2 = '';
     if (resolution === 'medium'){
        if (type === 'profile')
            path2 = 'r200x200';
        else if (type === 'post')
            path2 = 'r500x500';
    } else if (resolution === 'small' && type == 'profile')
        path2 = 'r48x48';
    
    if (path1 != '' && path2 != ''){
        const myPath = path2 + '/' + file;
        logger.debug(`Sending the file with following path ${myPath}`);
        return res.sendFile(myPath,  { root:  path1 + '/' });
    } else {
        logger.debug('Resource does not exists');
        return res.boom.notFound(messages['m404.3']);
    }
}