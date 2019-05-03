const NODE_ENV = process.env.NODE_ENV || 'development';
let config = {}

if (NODE_ENV === 'development'){
    config = {
        PORT:        process.env.PORT || 5111,
        WEB_PASS:    process.env.WEB_PASS || ['*'],
        MONGODB:     process.env.MONGO || 'mongodb://localhost:27017/eviar_production',
        HASH_LENGTH: process.env.HASH_LENGTH || 20,
        JWT_TOKEN:   process.env.JWT_TOKEN || 'gasdhqegrq78jewnjbsdf6',
        LOG_LEVEL:   process.env.LOG_LEVEL || 'debug'
    }
} else if (NODE_ENV === 'test'){
    config = {
        PORT:        process.env.PORT || 6111,
        WEB_PASS:    process.env.WEB_PASS || ['*'],
        MONGODB:     process.env.MONGO || 'mongodb://localhost:27017/enviar_test',
        HASH_LENGTH: process.env.HASH_LENGTH || 20,
        JWT_TOKEN:   process.env.JWT_TOKEN || 'gasdhqegrq78jewnjbsdf6',
        LOG_LEVEL:   process.env.LOG_LEVEL || 'debug'
    }

} else if (NODE_ENV === 'production'){
    config = {
        PORT:        process.env.PORT || 5111,
        WEB_PASS:    process.env.WEB_PASS || ['*'],
        MONGODB:     process.env.MONGO || 'mongodb://localhost:27017/eviar_production',
        HASH_LENGTH: process.env.HASH_LENGTH || 20,
        JWT_TOKEN:   process.env.JWT_TOKEN || 'gasdhqegrq78jewnjbsdf6',
        LOG_LEVEL:   process.env.LOG_LEVEL || 'info'
    }
}

config.NODE_ENV = NODE_ENV;

export default config;