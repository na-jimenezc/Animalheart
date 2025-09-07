package com.animalheart.animalheart.controller;

import com.animalheart.animalheart.model.Cliente;
import com.animalheart.animalheart.model.Mascota;
import com.animalheart.animalheart.model.Veterinario;
import com.animalheart.animalheart.repository.ClienteRepository;
import com.animalheart.animalheart.service.serviceInterface.ClienteService;
import com.animalheart.animalheart.service.serviceInterface.MascotaService;
import com.animalheart.animalheart.service.serviceInterface.VeterinarioService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
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
    private static final String CLIENTE_AUTH = "CLIENTE_AUTH";

    @Autowired
    ClienteRepository clienteRepo;

    @Autowired
    MascotaService mascotaService;
    

    @GetMapping("/login-cliente")
    public String mostrarFormularioLogin() {
        return "login-cliente";
    }
   @PostMapping("/login-cliente")
public String procesarLogin(@RequestParam("correo") String correo, HttpSession session, Model model) {
    Cliente clienteEncontrado = clienteRepo.findAll()
            .stream()
            .filter(c -> c.getCorreo().equalsIgnoreCase(correo))
            .findFirst()
            .orElse(null);

    if (clienteEncontrado == null) {
        model.addAttribute("error", "Correo no registrado. Intenta nuevamente.");
        return "login-cliente";
    }
    
    session.setAttribute("CLIENTE_AUTH", clienteEncontrado);
    
    return "redirect:/clientes/dashboard";
}
    @GetMapping("/dashboard")
    public String mostrarDashboardCliente(Model model, HttpSession session) {
        Cliente clienteEnSesion = (Cliente) session.getAttribute("CLIENTE_AUTH");

        if (clienteEnSesion == null) {
            return "redirect:/clientes/login-cliente?error=Necesita iniciar sesión";
        }

        Cliente clienteActualizado = clienteService.obtenerClientePorId(clienteEnSesion.getId());

        List<Mascota> mascotas = mascotaService.obtenerMascotasPorClienteId(clienteActualizado.getId());

        model.addAttribute("mascotas", mascotas);
        model.addAttribute("cliente", clienteActualizado);

        return "dashboard-cliente";
    }

    @GetMapping("/logout")
    public String logoutCliente(HttpSession session) {
        session.removeAttribute(CLIENTE_AUTH);
        session.invalidate();
        return "redirect:/clientes/login-cliente";
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
    @GetMapping("/mascotas/{id}")
    public String verDetalleMascotaCliente(@PathVariable Long id, Model model, HttpSession session) {
        Cliente cliente = (Cliente) session.getAttribute("CLIENTE_AUTH");
        if (cliente == null) {
            return "redirect:/clientes/login-cliente";
        }

        Mascota mascota = mascotaService.obtenerMascotaPorId(id);
        
        if (mascota == null || mascota.getCliente() == null || 
            !mascota.getCliente().getId().equals(cliente.getId())) {
            return "redirect:/clientes/dashboard";
        }

        model.addAttribute("mascota", mascota);
        model.addAttribute("cliente", cliente);
        return "detalle-mascota-cliente";
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
        
        if (cliente.getCedula() == null || cliente.getCedula().trim().isEmpty()) {
            model.addAttribute("error", "La cédula es requerida");
            return mostrarFormularioConError(model, session);
        }
        
        if (clienteService.existeClientePorCedula(cliente.getCedula())) {
            model.addAttribute("error", "Ya existe un cliente con esta cédula");
            return mostrarFormularioConError(model, session);
        }

        clienteService.guardarCliente(cliente);
        return "redirect:/mascotas/nueva?success=Cliente registrado correctamente";
        
    } catch (Exception e) {
        e.printStackTrace();
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

    @org.springframework.web.bind.annotation.PostMapping("/{id}/eliminar-hard")
    @Transactional
    public String eliminarClienteHard(@PathVariable Long id,
                                    @RequestParam(value = "cedula", required = false) String cedula,
                                    RedirectAttributes ra) {
        try {
           
            clienteService.eliminarClienteHard(id);

            ra.addFlashAttribute("success", "Cliente eliminado correctamente.");
        } catch (Exception ex) {
            ra.addFlashAttribute("error", "No se pudo eliminar al cliente: " + ex.getMessage());
        }
        return "redirect:/mascotas";
    }

    @org.springframework.web.bind.annotation.GetMapping("/{id}/editar")
    public String editarClienteForm(@org.springframework.web.bind.annotation.PathVariable Long id,
                                    org.springframework.ui.Model model) {
        model.addAttribute("cliente", clienteService.obtenerClientePorId(id));
        return "editar-cliente";
    }

    @org.springframework.web.bind.annotation.PostMapping("/{id}/editar")
    public String editarClienteSubmit(@org.springframework.web.bind.annotation.PathVariable Long id,
                                    @org.springframework.web.bind.annotation.RequestParam String cedula,
                                    @org.springframework.web.bind.annotation.RequestParam String nombres,
                                    @org.springframework.web.bind.annotation.RequestParam(required=false) String correo,
                                    @org.springframework.web.bind.annotation.RequestParam(required=false) String telefono,
                                    org.springframework.web.servlet.mvc.support.RedirectAttributes ra) {
        clienteService.actualizarCliente(id, cedula, nombres, correo, telefono);
        ra.addFlashAttribute("success", "Cliente actualizado correctamente.");
        return "redirect:/clientes";
    }
    
    @GetMapping
    public String clientesHome() {
    return "redirect:/mascotas";
    }

}
