import helmet = require('helmet');

export const contentSecurityPolicyMiddleware = helmet.contentSecurityPolicy({
    directives: {
        baseUri: ["'self'"],
        blockAllMixedContent: true,
        connectSrc: ["'self'"],
        defaultSrc: ["'self'", 'js.stripe.com'],
        fontSrc: ["'self'"],
        formAction: ["'self'"],
        frameAncestors: ["'self'"],
        frameSrc: ["'self'", 'js.stripe.com'],
        imgSrc: ["'self'"],
        manifestSrc: ["'self'"],
        mediaSrc: ["'self'"],
        objectSrc: ["'self'"],
        sandbox: ['allow-same-origin', 'allow-scripts'],
        scriptSrc: ["'self'", 'js.stripe.com', "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        upgradeInsecureRequests: true,
        workerSrc: ["'self'"],
    },
    browserSniff: false,
});
