package com.animalheart.animalheart.controller;

import com.animalheart.animalheart.model.Administrador;
import com.animalheart.animalheart.model.Veterinario;
import com.animalheart.animalheart.service.AdministradorService;
import com.animalheart.animalheart.service.VeterinarioService;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class AdministradorController {

    private static final String ADMIN_AUTH = "ADMIN_AUTH";

    private final VeterinarioService veterinarioService;
    private final AdministradorService administradorService;

    public AdministradorController(VeterinarioService veterinarioService,
                                   AdministradorService administradorService) {
        this.veterinarioService = veterinarioService;
        this.administradorService = administradorService;
    }

    @GetMapping("/login-admin")
    public String loginAdminForm(@RequestParam(value = "error", required = false) String error,
                                 Model model) {
        if (error != null) {
            model.addAttribute("error", error);
        }
        return "login-admin";
    }

    @PostMapping("/login-admin")
    public String loginAdmin(@RequestParam String correo,
                             @RequestParam String clave,
                             Model model,
                             HttpSession session) {

        if (administradorService.validar(correo, clave)) {
            Administrador admin = administradorService.obtenerPorCorreo(correo);
            session.setAttribute(ADMIN_AUTH, admin);
            return "redirect:/admin/dashboard";
        }

        model.addAttribute("error", "Credenciales incorrectas");
        return "login-admin";
    }

    @PostMapping("/admin/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/login-admin?error=Sesión%20cerrada";
    }

    private boolean noLogueado(HttpSession s) {
        return s.getAttribute(ADMIN_AUTH) == null;
    }

    @GetMapping("/admin/veterinarios")
    public String listarVeterinarios(Model model, HttpSession session) {
        if (noLogueado(session)) return "redirect:/login-admin?error=Debes%20iniciar%20sesión";

        model.addAttribute("veterinarios", veterinarioService.obtenerVeterinariosActivos());
        return "ver-veterinarios";
    }

    @GetMapping("/admin/veterinarios/{id}")
    public String detalleVeterinario(@PathVariable Long id, Model model, HttpSession session) {
        if (noLogueado(session)) return "redirect:/login-admin?error=Debes%20iniciar%20sesión";

        Veterinario vet = veterinarioService.obtenerVeterinarioPorId(id);
        if (vet == null) return "redirect:/admin/veterinarios?notFound";

        model.addAttribute("veterinario", vet);
        return "detalle-veterinario";
    }

    @GetMapping("/admin/dashboard")
    public String dashboardAdmin(HttpSession session) {
        if (noLogueado(session)) return "redirect:/login-admin?error=Debes%20iniciar%20sesión";
        return "dashboard-admin";
    }
}
