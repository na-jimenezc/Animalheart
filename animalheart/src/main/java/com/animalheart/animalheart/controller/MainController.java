package com.animalheart.animalheart.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {

    @GetMapping("/")
    public String index() {
        // Simplemente delega en la plantilla "index".
        return "index";
    }
}
