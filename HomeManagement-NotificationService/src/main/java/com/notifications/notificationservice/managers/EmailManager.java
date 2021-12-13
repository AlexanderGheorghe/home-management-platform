package com.notifications.notificationservice.managers;

import com.notifications.notificationservice.model.Email;
import org.springframework.stereotype.Component;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;

import static java.util.Objects.nonNull;

@Component
public class EmailManager {

    public static final String TEXT_HTML = "text/html";

    public void setEmailBody(Email email, Multipart multipart) throws MessagingException {
        MimeBodyPart mimeBodyPart = new MimeBodyPart();
        mimeBodyPart.setContent(email.getBody(), TEXT_HTML);
        multipart.addBodyPart(mimeBodyPart);
    }

    public void setRecipients(Email email, Message message) throws MessagingException {
        setToRecipients(email, message);
        setCCRecipients(email, message);
    }

    private void setToRecipients(Email email, Message message) throws MessagingException {
        message.addRecipient(Message.RecipientType.TO, new InternetAddress(email.getTo()));
    }

    private void setCCRecipients(Email email, Message message) throws MessagingException {
        if (nonNull(email.getCc())) {
            for (String cc : email.getCc()) {
                message.addRecipient(Message.RecipientType.CC, new InternetAddress(cc));
            }
        }
    }
}
