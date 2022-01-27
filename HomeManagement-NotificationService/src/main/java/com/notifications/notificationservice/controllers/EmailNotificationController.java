package com.notifications.notificationservice.controllers;

import com.notifications.notificationservice.model.NotificationRequest;
import com.notifications.notificationservice.services.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api")
public class EmailNotificationController {

    private final NotificationService notificationService;

    @PostMapping("/email")
    public synchronized void sendNotifications(@RequestBody NotificationRequest request) {
        notificationService.sendNotification(request);
    }
}
