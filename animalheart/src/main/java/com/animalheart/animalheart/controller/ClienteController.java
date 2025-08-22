package com.animalheart.animalheart.controller;

import com.animalheart.animalheart.model.Cliente;
import com.animalheart.animalheart.model.Veterinario;
import com.animalheart.animalheart.repository.ClienteRepository;
import com.animalheart.animalheart.service.ClienteService;
import com.animalheart.animalheart.service.VeterinarioService;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import org.springframework.transaction.annotation.Transactional;
import jakarta.servlet.http.HttpSession;

@Controller
@RequestMapping("/clientes")
public class ClienteController {

     @Autowired
    ClienteService clienteService;

    @Autowired
    VeterinarioService veterinarioService;

    private static final String VET_AUTH = "VET_AUTH";

    @Autowired
    ClienteRepository clienteRepo;

    @GetMapping("/login-cliente")
    public String mostrarFormularioLogin() {
        return "login-cliente"; 
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

    @GetMapping("/nuevo")
    public String mostrarFormularioCliente(Model model, HttpSession session) {
        Veterinario veterinario = (Veterinario) session.getAttribute(VET_AUTH);
        if (veterinario == null) {
            return "redirect:/login-veterinario";
        }
        
        model.addAttribute("cliente", new Cliente());
        model.addAttribute("veterinario", veterinario);
        return "aniadir-duenio"; 
    }

   @PostMapping("/nuevo")
   public String procesarNuevoClienteModel(
        @ModelAttribute Cliente cliente,
        HttpSession session,
        Model model) {
    
    Veterinario veterinario = (Veterinario) session.getAttribute(VET_AUTH);
    if (veterinario == null) {
        return "redirect:/login-veterinario";
    }
    
    try {
        // Recargar el veterinario desde la base de datos para tener una entidad managed
        Veterinario veterinarioManaged = veterinarioService.obtenerVeterinarioPorId(veterinario.getId());
        
        if (cliente.getCedula() == null || cliente.getCedula().trim().isEmpty()) {
            model.addAttribute("error", "La cédula es requerida");
            return mostrarFormularioConError(model, session);
        }
        
        if (clienteService.existeClientePorCedula(cliente.getCedula())) {
            model.addAttribute("error", "Ya existe un cliente con esta cédula");
            return mostrarFormularioConError(model, session);
        }
        
        Cliente clienteGuardado = clienteService.guardarCliente(cliente);
        
        if (clienteGuardado.getVeterinarios() == null) {
            clienteGuardado.setVeterinarios(new ArrayList<>());
        }
        if (veterinarioManaged.getClientes() == null) {
            veterinarioManaged.setClientes(new ArrayList<>());
        }
        
        //RELACIÓN BIDIRECCIONAL (30 MINUTOS EN ESTA VAINA)
        clienteGuardado.getVeterinarios().add(veterinarioManaged);
        veterinarioManaged.getClientes().add(clienteGuardado);
        
        clienteService.guardarCliente(clienteGuardado);
        veterinarioService.guardarVeterinario(veterinarioManaged);
        
        return "redirect:/mascotas/nueva?success=Cliente registrado correctamente";
        
    } catch (Exception e) {
        model.addAttribute("error", "Error al registrar el cliente: " + e.getMessage());
        return mostrarFormularioConError(model, session);
    
    }

    
   }

    private String mostrarFormularioConError(Model model, HttpSession session) {
        Veterinario veterinario = (Veterinario) session.getAttribute(VET_AUTH);
        model.addAttribute("cliente", new Cliente());
        model.addAttribute("veterinario", veterinario);
        return "aniadir-duenio";
    }

}
