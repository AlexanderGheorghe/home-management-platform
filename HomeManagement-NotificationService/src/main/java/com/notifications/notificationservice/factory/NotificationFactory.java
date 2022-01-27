package com.notifications.notificationservice.factory;

import com.notifications.notificationservice.enums.NotificationType;
import com.notifications.notificationservice.managers.EmailSender;
import com.notifications.notificationservice.managers.NotificationSender;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@AllArgsConstructor
@Component
public class NotificationFactory {

    private final EmailSender emailSender;

    public NotificationSender createNotification(NotificationType type) {
        return switch(type) {
            case EMAIL -> emailSender;

            default -> emailSender;
        };
    }

}
