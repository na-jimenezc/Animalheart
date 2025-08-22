package com.animalheart.animalheart.controller;

import com.animalheart.animalheart.model.Veterinario;
import com.animalheart.animalheart.service.VeterinarioService;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class VeterinarioController {

    private final VeterinarioService veterinarioService;

    public VeterinarioController(VeterinarioService veterinarioService) {
        this.veterinarioService = veterinarioService;
    }

    @GetMapping("/login-veterinario")
    public String mostrarLoginForm() {
        return "login-veterinario";
    }

    @PostMapping("/login-veterinario")
    public String procesarLogin(
            @RequestParam("nombreUsuario") String nombreUsuario,
            @RequestParam("contrasenia") String contrasenia,
            Model model) {

        Veterinario veterinario =
                veterinarioService.validarVeterinario(nombreUsuario, contrasenia);

        if (veterinario != null) {
            return "redirect:/mascotas";
        } else {
            model.addAttribute("error", "Credenciales incorrectas");
            return "login-veterinario";
        }
    }
}