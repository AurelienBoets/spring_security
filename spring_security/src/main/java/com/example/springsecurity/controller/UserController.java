package com.example.springsecurity.controller;


import com.example.springsecurity.dto.BaseResponseDto;
import com.example.springsecurity.dto.UserLoginDto;
import com.example.springsecurity.model.User;
import com.example.springsecurity.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class UserController {


    @Autowired
    UserService userService;


    @PostMapping("/api/auth/register")
    public BaseResponseDto registerUser(@RequestBody User user) {
        if (userService.createUser(user)) {
            return new BaseResponseDto("success");
        } else {
            return new BaseResponseDto("failed");
        }
    }

    @PostMapping("/api/auth/login")
    public BaseResponseDto loginUser(@RequestBody UserLoginDto userLogin) {
        if (userService.checkUserNameExists(userLogin.getEmail())) {

            if (userService.verifyUser(userLogin.getEmail(), userLogin.getPassword())) {
                Map<String, Object> data = new HashMap<>();
                data.put("token", userService.generateToken(userLogin.getEmail(), userLogin.getPassword()));
                return new BaseResponseDto("success", data);
            } else {
                return new BaseResponseDto("Wrong password");
            }
        } else {
            return new BaseResponseDto("user not found");
        }
    }


}
