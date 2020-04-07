import { featurePolicy } from 'helmet';

export const featurePolicyMiddleware = featurePolicy({
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
