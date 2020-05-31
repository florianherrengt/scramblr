"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helmet_1 = require("helmet");
exports.featurePolicyMiddleware = helmet_1.featurePolicy({
    features: [
        'accelerometer',
        'ambientLightSensor',
        'autoplay',
        'camera',
        'encryptedMedia',
        'fullscreen',
        'geolocation',
        'gyroscope',
        'magnetometer',
        'microphone',
        'midi',
        'payment',
        'pictureInPicture',
        'speaker',
        'syncXhr',
        'usb',
    ].reduce((policies, featureKey) => {
        policies[featureKey] = ["'none'"];
        return policies;
    }, {}),
});
//# sourceMappingURL=featurePolicy.js.map