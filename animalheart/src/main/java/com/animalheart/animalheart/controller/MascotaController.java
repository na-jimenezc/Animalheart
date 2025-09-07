package com.animalheart.animalheart.controller;

import com.animalheart.animalheart.model.Cliente;
import com.animalheart.animalheart.model.Mascota;
import com.animalheart.animalheart.model.Veterinario;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import org.springframework.data.domain.Page;
import jakarta.servlet.http.HttpSession;
import java.util.List;

import com.animalheart.animalheart.service.serviceInterface.MascotaService;
import com.animalheart.animalheart.service.serviceInterface.VeterinarioService;

@Controller
@RequestMapping("/mascotas")
public class MascotaController {

    @Autowired
    VeterinarioService veterinarioService;

    @Autowired
    MascotaService mascotaService;

    @Autowired
    com.animalheart.animalheart.service.serviceInterface.ClienteService clienteService;

    private static final String VET_AUTH = "VET_AUTH";

    @GetMapping
    public String listarMascotas(
            Model model,
            HttpSession session,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size
    ) {
        Veterinario veterinario = (Veterinario) session.getAttribute(VET_AUTH);
        if (veterinario == null) {
            return "redirect:/login-veterinario?error=Necesita iniciar sesión";
        }

        veterinario = veterinarioService.obtenerVeterinarioPorId(veterinario.getId());
        session.setAttribute(VET_AUTH, veterinario);

        Page<Mascota> pageMascotas = mascotaService.obtenerMascotasPaginadas(PageRequest.of(page, size));

        model.addAttribute("mascotas", pageMascotas.getContent());
        model.addAttribute("currentPage", pageMascotas.getNumber());
        model.addAttribute("totalPages", pageMascotas.getTotalPages());
        model.addAttribute("totalElements", pageMascotas.getTotalElements());
        model.addAttribute("pageSize", size);

        model.addAttribute("veterinario", veterinario);

        return "mascotas"; 
    }

    @GetMapping("/{id}")
    public String verDetalleMascota(@PathVariable Long id, Model model, HttpSession session) {
        Veterinario veterinario = (Veterinario) session.getAttribute(VET_AUTH);
        if (veterinario == null) {
            return "redirect:/login-veterinario?error=Necesita iniciar sesión";
        }
        
        Mascota mascota = mascotaService.obtenerMascotaPorId(id);
        if (mascota == null) {
            return "redirect:/mascotas?error=Mascota no encontrada";
        }
        
        model.addAttribute("mascota", mascota);
        model.addAttribute("veterinario", veterinario);
        return "detalle-mascota";
    }

    @GetMapping("/nueva")
    public String mostrarFormularioNuevaMascota(Model model, HttpSession session) {
            Veterinario veterinario = (Veterinario) session.getAttribute(VET_AUTH);
            if (veterinario == null) {
                return "redirect:/login-veterinario";
            }
            
            List<Cliente> clientes = clienteService.obtenerTodos();
            
            model.addAttribute("mascota", new Mascota());
            model.addAttribute("clientes", clientes);
            model.addAttribute("veterinario", veterinario);
            
            return "aniadir-mascota-dueno"; 
        }

    @PostMapping("/nueva")
    public String procesarNuevaMascota(
            @ModelAttribute Mascota mascota,
            @RequestParam("clienteId") Long clienteId,
            HttpSession session,
            Model model) {
        
        Veterinario veterinario = (Veterinario) session.getAttribute(VET_AUTH);
        if (veterinario == null) {
            return "redirect:/login-veterinario";
        }
        
        try {
            Cliente cliente = clienteService.obtenerClientePorId(clienteId);
            if (cliente == null) {
                model.addAttribute("error", "El cliente seleccionado no existe");
                return mostrarFormularioConError(model, session);
            }
            
            mascota.setCliente(cliente);
            mascotaService.registrarMascota(mascota);

            model.asMap().clear();
            
            return "redirect:/mascotas?success=Mascota registrada correctamente";
            
        } catch (Exception e) {
            model.addAttribute("error", "Error al registrar la mascota: " + e.getMessage());
            return mostrarFormularioConError(model, session);
        }
    }

    private String mostrarFormularioConError(Model model, HttpSession session) {
        Veterinario veterinario = (Veterinario) session.getAttribute(VET_AUTH);
        List<Cliente> clientes = clienteService.obtenerTodos();

        model.addAttribute("mascota", new Mascota());
        model.addAttribute("clientes", clientes);
        model.addAttribute("veterinario", veterinario);
        
        return "aniadir-mascota-dueno";
    }

    @PostMapping("/{id}/desactivar")
    public String desactivarMascota(@PathVariable Long id,
                                    RedirectAttributes ra,
                                    HttpSession session) {
        mascotaService.desactivarMascota(id);
        ra.addFlashAttribute("success", "Mascota desactivada permanentemente.");
        return "redirect:/mascotas";
    }

    @GetMapping("/{id}/editar")
    public String editarMascotaForm(@PathVariable Long id, Model model) {
    Mascota mascota = mascotaService.obtenerMascotaPorId(id);
    model.addAttribute("mascota", mascota);
    return "editar-mascota";
    }

    @PostMapping("/{id}/editar")
    public String editarMascotaSubmit(@PathVariable Long id,
                                  @RequestParam String nombre,
                                  @RequestParam String tipo,
                                  @RequestParam String raza,
                                  @RequestParam(required=false) String enfermedad,
                                  @RequestParam(required=false, name="fotoURL") String fotoURL,
                                  RedirectAttributes ra) {
    mascotaService.actualizarMascota(id, nombre, tipo, raza, enfermedad, fotoURL);
    ra.addFlashAttribute("success", "Mascota actualizada correctamente.");
    return "redirect:/mascotas";
    }
}
