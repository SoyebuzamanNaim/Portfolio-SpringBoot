package bd.edu.seu.portfoliospringboot.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Massage {
   private String name;
   private String email;
   private String phone;
   private String message;
   private Integer captchaAnswer;
   private Integer captchaExpected;
}
