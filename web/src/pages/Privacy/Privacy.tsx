import React from 'react';
import Typography from '@material-ui/core/Typography';

export const PrivacyPage = () => {
    return (
        <div>
            <Typography>Scramblr Privacy Notice</Typography>
            <Typography>
                Please read this document carefully before accessing or using
                this service!
            </Typography>
            <ol>
                <li>Introduction</li>
                <li>
                    <ol>
                        <li>Instances Provided By Herrengt Limited</li>
                        <Typography>
                            Herrengt Ltd hosts a Scramblr instance at
                            https://scramblrapp.com. This agreement does not
                            cover Scramblr instances hosted by anyone else.
                        </Typography>
                        <li>Company information</li>
                        <Typography>
                            Postal address: Unit 5 City Business Centre, Lower
                            Road, London, England, SE16 2XB
                        </Typography>
                    </ol>
                </li>
                <li>Your Data Privacy</li>
            </ol>
        </div>
    );
};
