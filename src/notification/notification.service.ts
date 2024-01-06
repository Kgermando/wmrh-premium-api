import { Injectable } from '@nestjs/common';
import { Subscription } from './models/webpush_util';
const webpush = require('web-push');

const vapidKeys = {
    publicKey: "BHnrukMOoUpozT0O0LK9g_snE-nSCM_XeoEfbsy3FJO5vJQIAk5TeSYqol0HlvMUU-3poVLx1xNl8nAv14JVoL4",
    privateKey: "EowHD96TortofOIEv_Idh2vidxh52GNSpnE-PYipqD0"
}

const options = {
    vapidDetails: {
        owner: "mailto:katakugermain@gmail.com",
        publicKey: vapidKeys.publicKey,
        privateKey: vapidKeys.privateKey
    },
    TTL: 60,
}

@Injectable()
export class NotificationService {

    sendPushNotification(subscription: Subscription) {
        webpush.sendNotification(
            subscription,
            JSON.stringify({
                notification: {
                    title: 'Bulletin de paie',
                    body: 'Votre bulletin de paie est disponible.',
                    vibrate: [100, 50, 100],
                    icon: 'https://www.shareicon.net/data/256x256/2015/10/02/110808_blog_512x512.png',
                    actions: [
                        { action: 'bar', title: 'Focus last'},
                        { action: 'baz', title: 'navigate last'}
                    ],
                    data: {
                       onActionClick: {
                            default: { operation: 'openWindow' },
                            bar: {
                                operation: 'focusLastFocusOrOpen',
                                url: '/layouts/salaires/disponible/:id/bulletin-paie',
                            },
                            baz: {
                                operation: 'navigateLastFocusedOrOpen',
                                url: '/sign'
                            }
                       }
                    }
                }
            }),
            options,
        )
        .then((log) => {
            console.log('Push notification sent.');
            console.log(log);
        })
        .catch((error) => {
            console.log(error);
        });
    }
}
