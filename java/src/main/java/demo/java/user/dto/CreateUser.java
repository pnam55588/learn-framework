package demo.java.user.dto;

import demo.java.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class CreateUser {
    private String name;
    private String email;
    private String password;

    public User toUser() {
        return new User(null, this.name, this.email, this.password, null, null, null);
    }
}
