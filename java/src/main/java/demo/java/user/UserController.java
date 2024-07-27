package demo.java.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

@Controller
public class UserController {
    
    @Autowired
    private UserService userService;

    @QueryMapping
    public User userByEmail(String email) {
        return userService.getUserByEmail(email);
    }
    // @QueryMapping
    // public User saveUser(User user) {
    //     return userService.save(user);
    // }
    @QueryMapping
    public List<User> initUsers() {
        return userService.init();
    }
}
