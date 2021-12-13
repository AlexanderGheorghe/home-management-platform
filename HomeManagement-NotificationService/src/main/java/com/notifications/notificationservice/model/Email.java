package com.notifications.notificationservice.model;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class Email {

    private String to;
    private List<String> cc;
    private String subject;
    private String body;

}
