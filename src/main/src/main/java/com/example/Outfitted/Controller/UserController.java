package com.example.Outfitted.Controller;
import com.example.Outfitted.Users.User;
import com.example.Outfitted.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.MediaType;

import java.util.concurrent.ExecutionException;

@RestController
@CrossOrigin
//@DemoController
public class UserController extends UserService {

    @Autowired
    UserService userService;

    @GetMapping("/getUserDetails")
    public User getUser(@RequestParam String email) throws InterruptedException, ExecutionException {
        return userService.getUserDetails(email);
    }

    @PostMapping("/createUser")
    public String createUser(@RequestBody User user) throws InterruptedException, ExecutionException {
        return userService.saveUserDetails(user);
    }

    @PutMapping("/updateUser")
    public String updateUser(@RequestBody User user) throws InterruptedException, ExecutionException {
        return userService.updateUserDetails(user);
    }

    @DeleteMapping("/deleteUser")
    public String deleteUser(@RequestParam String email) throws InterruptedException, ExecutionException {
        return userService.deleteUser(email);
    }

}
