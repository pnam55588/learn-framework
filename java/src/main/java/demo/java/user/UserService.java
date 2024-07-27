package demo.java.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import demo.java.user.dto.CreateUser;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<User> init() {
        userRepository.save(new CreateUser("nam", "nam@gmail.com", "123").toUser());
        userRepository.save(new CreateUser("dieu", "dieu@gmai.com", "123").toUser());
        return userRepository.findAll();
    }

    public User save(User user) {
        return userRepository.save(user);
    }
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
