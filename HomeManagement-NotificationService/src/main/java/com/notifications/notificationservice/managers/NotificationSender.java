package com.notifications.notificationservice.managers;

import com.notifications.notificationservice.model.NotificationRequest;

public interface NotificationSender {

    void sendNotification(NotificationRequest request);
}
