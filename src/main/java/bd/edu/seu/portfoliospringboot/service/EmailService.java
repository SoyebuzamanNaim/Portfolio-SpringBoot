package bd.edu.seu.portfoliospringboot.service;

import bd.edu.seu.portfoliospringboot.model.Massage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;
// from to both are my mail
    @Value("${spring.mail.username}")
    private String fromEmail;

    public void sendMessage(Massage massage) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(fromEmail); // Send to myself
        message.setSubject("Portfolio Message from " + massage.getName());

        StringBuilder emailBody = new StringBuilder();
        emailBody.append("You have received a new message from your portfolio contact form.\n\n");
        emailBody.append("Name: ").append(massage.getName()).append("\n");

        if (massage.getEmail() != null && !massage.getEmail().trim().isEmpty()) {
            emailBody.append("Email: ").append(massage.getEmail()).append("\n");
        }

        if (massage.getPhone() != null && !massage.getPhone().trim().isEmpty()) {
            emailBody.append("Phone: ").append(massage.getPhone()).append("\n");
        }



        emailBody.append("\nMessage:\n").append(massage.getMessage());

        message.setText(emailBody.toString());
        mailSender.send(message);
    }
}
