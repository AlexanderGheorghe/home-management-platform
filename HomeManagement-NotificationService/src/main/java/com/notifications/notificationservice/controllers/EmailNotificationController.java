package com.notifications.notificationservice.controllers;

import com.notifications.notificationservice.model.EmailRequest;
import com.notifications.notificationservice.services.EmailNotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api")
public class EmailNotificationController {

    private final EmailNotificationService emailNotificationService;

    @PostMapping("/email")
    public synchronized void sendNotifications(@RequestBody EmailRequest request) {
        emailNotificationService.sendEmail(request);
    }
}
