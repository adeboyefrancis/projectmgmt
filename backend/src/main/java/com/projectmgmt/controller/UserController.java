package com.projectmgmt.controller;

import com.projectmgmt.model.User;
import com.projectmgmt.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // GET /api/users → used by InviteMemberDialog to list all users
    @GetMapping
    public List<User> getAll() {
        return userService.findAll();
    }

    @GetMapping("/{id}")
    public User getById(@PathVariable String id) {
        return userService.findById(id);
    }
}
