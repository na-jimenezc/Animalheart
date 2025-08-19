package com.animalheart.animalheart.controller;

import com.animalheart.animalheart.entities.Cliente;
import com.animalheart.animalheart.repository.ClienteRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpSession;

@Controller
public class ClienteController {

    private final ClienteRepository clienteRepo;

    public ClienteController() {
        this.clienteRepo = new ClienteRepository();
    }

    // 1. Mostrar el formulario de login del cliente
    @GetMapping("/login-cliente")
    public String mostrarFormularioLogin() {
        return "login-cliente"; // login-cliente.html
    }

    // 2. Procesar el login del cliente (por correo)
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
