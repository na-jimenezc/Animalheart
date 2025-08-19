package com.animalheart.animalheart.controller;

import com.animalheart.animalheart.entities.Administrador;
import com.animalheart.animalheart.entities.Veterinario;
import com.animalheart.animalheart.service.AdministradorService;
import com.animalheart.animalheart.service.VeterinarioService;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

/**
 * Controlador MVC del Administrador.
 *
 * Flujo:
 *   GET /login-admin  → muestra el formulario.
 *   POST /login-admin → valida credenciales; si OK guarda el admin en sesión y redirige a /admin/veterinarios.
 *   POST /admin/logout → invalida la sesión.
 *   GET /admin/** (protegidas) → requieren sesión; si no hay, redirigen a /login-admin.
 */
@Controller
public class AdministradorController {

    /** Clave del atributo de sesión que indica admin autenticado. */
    private static final String ADMIN_AUTH = "ADMIN_AUTH";

    // Dependencias de servicios de dominio y autenticación
    private final VeterinarioService veterinarioService;
    private final AdministradorService adminAuthService;

    /**
     * Inyección por constructor recomendada para @Controller.
     */
    public AdministradorController(VeterinarioService veterinarioService,
                                   AdministradorService adminAuthService) {
        this.veterinarioService = veterinarioService;
        this.adminAuthService = adminAuthService;
    }

    // -------------------- LOGIN --------------------

    /**
     * GET /login-admin
     * Muestra el formulario de login del administrador.
     * @param error mensaje opcional para mostrar credenciales erróneas o sesión requerida.
     */
    @GetMapping("/login-admin")
    public String loginAdminForm(@RequestParam(value = "error", required = false) String error,
                                 Model model) {
        if (error != null) {
            model.addAttribute("error", error);
        }
        // Renderiza templates/login-admin.html
        return "login-admin";
    }

    /**
     * POST /login-admin
     * Valida credenciales. Si son correctas, guarda el admin en sesión y redirige al listado.
     * El formulario debe enviar campos "correo" y "clave".
     */
    @PostMapping("/login-admin")
    public String loginAdmin(@RequestParam String correo,
                             @RequestParam String clave,
                             Model model,
                             HttpSession session) {

        // Validación en memoria.
        if (adminAuthService.validar(correo, clave)) {
            Administrador admin = adminAuthService.obtenerPorCorreo(correo);
            session.setAttribute(ADMIN_AUTH, admin); // marca sesión activa
             return "redirect:/admin/dashboard";
            //return "redirect:/admin/veterinarios";
        }

        // Si las credenciales son incorrectas, vuelve al formulario con mensaje.
        model.addAttribute("error", "Credenciales incorrectas");
        return "login-admin";
    }

    /**
     * POST /admin/logout
     * Cierra la sesión actual del administrador.
     */
    @PostMapping("/admin/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/login-admin?error=Sesión%20cerrada";
    }

    // -------------------- Guard de sesión --------------------

    /**
     * Pequeño "guard" para saber si NO hay sesión de administrador.
     * @return true si no hay admin autenticado en la sesión.
     */
    private boolean noLogueado(HttpSession s) {
        return s.getAttribute(ADMIN_AUTH) == null;
    }

    // -------------------- Rutas PROTEGIDAS --------------------

    /**
     * GET /admin/veterinarios
     * Lista de veterinarios activos. Requiere estar logueado.
     */
    @GetMapping("/admin/veterinarios")
    public String listarVeterinarios(Model model, HttpSession session) {
        if (noLogueado(session)) return "redirect:/login-admin?error=Debes%20iniciar%20sesión";

        model.addAttribute("veterinarios", veterinarioService.obtenerVeterinariosActivos());
        return "ver-veterinarios";
    }

    /**
     * GET /admin/veterinarios/{id}
     * Detalle de un veterinario. Requiere estar logueado.
     */
    @GetMapping("/admin/veterinarios/{id}")
    public String detalleVeterinario(@PathVariable Integer id, Model model, HttpSession session) {
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
