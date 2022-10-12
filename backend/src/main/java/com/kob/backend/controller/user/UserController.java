package com.kob.backend.controller.user;

import com.kob.backend.mapper.UserMapper;
import com.kob.backend.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.GenericDeclaration;
import java.util.List;

@RestController
public class UserController {

    @Autowired
    UserMapper userMapper;

    @GetMapping("/user/all")
    public List<User> getAll(){
        return userMapper.selectList(null);
    }

    @GetMapping("/user/{userid}")
    public User getUser(@PathVariable int userid){
        return userMapper.selectById(userid);
    }

    @GetMapping("/user/add/{id}/{username}/{password}")
    public String addUser(
            @PathVariable int id,
            @PathVariable String username,
            @PathVariable String password){
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encodepassword = passwordEncoder.encode(password);
        User user = new User(id, username, encodepassword);
        userMapper.insert(user);
        return "add success";
    }

    @GetMapping("/user/delete/{userid}")
    public String deleteUser(@PathVariable int userid){
        userMapper.deleteById(userid);
        return "delete success";
    }


}
