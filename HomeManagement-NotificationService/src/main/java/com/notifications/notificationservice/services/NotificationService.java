package com.notifications.notificationservice.services;

import com.notifications.notificationservice.enums.NotificationType;
import com.notifications.notificationservice.managers.NotificationSender;
import com.notifications.notificationservice.factory.NotificationFactory;
import com.notifications.notificationservice.model.NotificationRequest;
import lombok.AllArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class NotificationService {

    private final NotificationFactory notificationFactory;


    @Async
    public void sendNotification(NotificationRequest request) {
        NotificationSender emailSender = notificationFactory.createNotification(NotificationType.EMAIL);
        emailSender.sendNotification(request);
    }
}
