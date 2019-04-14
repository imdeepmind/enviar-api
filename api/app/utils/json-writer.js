import logger from './logger';

export default (msg, code, res) => {
    logger.info('at here')
    if (!res) {
		const res = this.res;
    }

    logger.info('at here')
    const msgJSON = JSON.stringify(message);

    try {
		res.set("Connection", "close");
		res.contentType('json');
	} catch (e) {
		logger.error('Token -> JSONWRITER', e);
    }
    
    if (code) {
		try {
			res.status(code).send(msgJSON);
		} catch (e) {
			res.send(msgJSON);
		}
	} else {
		res.status(msg.status.code).send(msgJSON);
	}

    if (msg.data) {
		msg.data = [];
	}
    msg.error = 0;
    
    logger.info('at here')
}