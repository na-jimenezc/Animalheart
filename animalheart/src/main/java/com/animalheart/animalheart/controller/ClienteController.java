package com.animalheart.animalheart.controller;

import com.animalheart.animalheart.model.Cliente;
import com.animalheart.animalheart.repository.ClienteRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class ClienteController {


    @Autowired
    ClienteRepository clienteRepo;

    @GetMapping("/login-cliente")
    public String mostrarFormularioLogin() {
        return "login-cliente"; // login-cliente.html
    }
    @PostMapping("/login-cliente")
    public String procesarLogin(@RequestParam("correo") String correo, Model model) {
        Cliente clienteEncontrado = clienteRepo.findAll()
                .stream()
                .filter(c -> c.getCorreo().equalsIgnoreCase(correo))
                .findFirst()
                .orElse(null);

        if (clienteEncontrado == null) {
            model.addAttribute("error", "Correo no registrado. Intenta nuevamente.");
            return "login-cliente";
        }

        model.addAttribute("cliente", clienteEncontrado);
        return "dashboard-cliente"; 
    }

}
