package com.notifications.notificationservice.services;

import com.notifications.notificationservice.model.Email;
import com.notifications.notificationservice.model.EmailRequest;
import lombok.AllArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class EmailNotificationService {

    public static final String NEW_TASK_ASSIGNED_FOR_YOU = "New task assigned for you";
    private final EmailSender emailSender;

    @Async
    public void sendEmail(EmailRequest request) {
        Email email = Email.builder()
                .to(request.getUserEmailAddress())
                .cc(request.getOtherUserAddresses())
                .body(request.getMessage())
                .subject(NEW_TASK_ASSIGNED_FOR_YOU)
                .build();

        emailSender.sendEmail(email);
    }
}
