package bd.edu.seu.portfoliospringboot.controller;

import bd.edu.seu.portfoliospringboot.model.Massage;
import bd.edu.seu.portfoliospringboot.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.Random;

@Controller
public class MessageController {

    @Autowired
    private EmailService emailService;

    @GetMapping("/contact")
    public String contact(Model model) {
        // Generate CAPTCHA
        Random random = new Random();
        int num1 = random.nextInt(10) + 1;
        int num2 = random.nextInt(10) + 1;
        int expectedAnswer = num1 + num2;

        model.addAttribute("captchaNum1", num1);
        model.addAttribute("captchaNum2", num2);
        model.addAttribute("captchaExpected", expectedAnswer);
        model.addAttribute("massage", new Massage());
        return "redirect:/";
    }

    @PostMapping("/contact")
    public String submitContact(@ModelAttribute Massage massage,
            @RequestParam(value = "captchaExpected", required = false) Integer captchaExpected,
            RedirectAttributes redirectAttributes) {

        // validation
        StringBuilder errors = new StringBuilder();
        boolean hasErrors = false;

        // name is required
        if (massage.getName() == null || massage.getName().trim().isEmpty()) {
            errors.append("Name field is required. ");
            hasErrors = true;
        }

        // message is required
        if (massage.getMessage() == null || massage.getMessage().trim().isEmpty()) {
            errors.append("Message field is required. ");
            hasErrors = true;
        }

        // email or phone (at least one is required)
        boolean hasEmail = massage.getEmail() != null && !massage.getEmail().trim().isEmpty();
        boolean hasPhone = massage.getPhone() != null && !massage.getPhone().trim().isEmpty();

        if (!hasEmail && !hasPhone) {
            errors.append("Phone or email, any one of the fields is required. ");
            hasErrors = true;
        }

        // CAPTCHA validation
        if (captchaExpected == null || massage.getCaptchaAnswer() == null ||
                !massage.getCaptchaAnswer().equals(captchaExpected)) {
            errors.append("CAPTCHA verification failed. Please solve the math problem correctly. ");
            hasErrors = true;
        }

        if (hasErrors) {
            // Clear CAPTCHA answer so user has to enter it again
            massage.setCaptchaAnswer(null);

            redirectAttributes.addFlashAttribute("error", errors.toString());
            redirectAttributes.addFlashAttribute("massage", massage);
            // Regenerate CAPTCHA for retry
            Random random = new Random();
            int num1 = random.nextInt(10) + 1;
            int num2 = random.nextInt(10) + 1;
            int newExpectedAnswer = num1 + num2;
            redirectAttributes.addFlashAttribute("captchaNum1", num1);
            redirectAttributes.addFlashAttribute("captchaNum2", num2);
            redirectAttributes.addFlashAttribute("captchaExpected", newExpectedAnswer);
            redirectAttributes.addFlashAttribute("scrollToContact", true);
            return "redirect:/";
        }

        try {
            // send email
            emailService.sendMessage(massage);
            redirectAttributes.addFlashAttribute("success",
                    "Message sent successfully! Thank you for reaching out. I'll get back to you as soon as possible.");
            redirectAttributes.addFlashAttribute("scrollToContact", true);
        } catch (Exception e) {
            // Clear CAPTCHA answer so user has to enter it again
            massage.setCaptchaAnswer(null);

            redirectAttributes.addFlashAttribute("error", "Failed to send message. Please try again later.");
            redirectAttributes.addFlashAttribute("massage", massage);
            // regenerate captcha for retry
            Random random = new Random();
            int num1 = random.nextInt(10) + 1;
            int num2 = random.nextInt(10) + 1;
            int newExpectedAnswer = num1 + num2;
            redirectAttributes.addFlashAttribute("captchaNum1", num1);
            redirectAttributes.addFlashAttribute("captchaNum2", num2);
            redirectAttributes.addFlashAttribute("captchaExpected", newExpectedAnswer);
            redirectAttributes.addFlashAttribute("scrollToContact", true);
            return "redirect:/";
        }

        return "redirect:/";
    }
}
