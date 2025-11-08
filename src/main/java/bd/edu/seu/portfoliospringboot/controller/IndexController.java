package bd.edu.seu.portfoliospringboot.controller;

import bd.edu.seu.portfoliospringboot.model.Massage;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.Random;

@Controller
public class IndexController {
    @GetMapping({ "/", "/home" })
    public String index(Model model) {
        // generate CAPTCHA for first time
        if (!model.containsAttribute("captchaNum1")) {
            Random random = new Random();
            int num1 = random.nextInt(10) + 1;
            int num2 = random.nextInt(10) + 1;
            int expectedAnswer = num1 + num2;

            model.addAttribute("captchaNum1", num1);
            model.addAttribute("captchaNum2", num2);
            model.addAttribute("captchaExpected", expectedAnswer);
        }

        //  massage for first time
        if (!model.containsAttribute("massage")) {
            model.addAttribute("massage", new Massage());
        }

        return "index";
    }
}
