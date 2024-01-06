import { Body, Controller, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';


@Controller('notifications')
export class NotificationController {
    constructor(private notificationService: NotificationService) {}

    @Post()
    async sendNotification(
        @Body() payload: any
    ): Promise<void> {

        const subscription = payload;

        return this.notificationService.sendPushNotification(subscription);
    }

   
}
