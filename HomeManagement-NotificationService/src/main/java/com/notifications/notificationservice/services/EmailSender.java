package com.notifications.notificationservice.services;

import com.notifications.notificationservice.model.Email;
import com.notifications.notificationservice.managers.EmailManager;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import java.time.LocalDateTime;
import java.util.Properties;

import static java.util.Objects.isNull;

@Service
@Slf4j
public class EmailSender {

    public static final String HOME_MANAGEMENT_ADDRESS = "home_management_unibuc@outlook.com";

    @Value("${mail.username}")
    private String username;

    @Value("${mail.password}")
    private String password;

    private final Properties emailSessionProperties;

    private final EmailManager emailManager;

    public EmailSender(@Qualifier("mailSessionProperties") Properties emailSessionProperties, EmailManager emailManager) {
        this.emailSessionProperties = emailSessionProperties;
        this.emailManager = emailManager;
    }

    public void sendEmail(Email email) {
        if (isNull(email.getTo()) || email.getTo().isEmpty()) {
            log.debug("No destination address. No email will be sent.");
        } else {
            try {
                log.debug("Sending email to addresses " + email.getTo() + " at " + LocalDateTime.now());

                Message message = new MimeMessage(Session.getInstance(emailSessionProperties, new Authenticator() {
                    @Override
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(username, password);
                    }
                }));
                message.setFrom(new InternetAddress(HOME_MANAGEMENT_ADDRESS));

                emailManager.setRecipients(email, message);

                message.setSubject(email.getSubject());

                Multipart multipart = new MimeMultipart();

                emailManager.setEmailBody(email, multipart);

                message.setContent(multipart);

                Transport.send(message);
                log.debug("Email sent to addresses " + email.getTo() + " at " + LocalDateTime.now());
            }
            catch (Exception e) {
                throw new RuntimeException(e.getMessage());
            }
        }
    }

}
