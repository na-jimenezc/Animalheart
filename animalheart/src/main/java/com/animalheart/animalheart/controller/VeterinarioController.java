package com.animalheart.animalheart.controller;

import com.animalheart.animalheart.service.VeterinarioService;
import com.animalheart.animalheart.entities.Veterinario;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * Controlador MVC para el flujo de acceso del Veterinario.
 *
 * Responsabilidades:
 *   Mostrar el formulario de login del veterinario (GET /login-veterinario).
 *   Procesar el envío del login (POST /login-veterinario): valida credenciales
 *       a través del servicio y, si son correctas, redirige al listado de mascotas.
 *
 * Este controlador no guarda sesión del usuario; simplemente
 * redirige si el login es correcto. 
 */
@Controller
public class VeterinarioController {

    /** Servicio de dominio que contiene la lógica para validar veterinarios. */
    private final VeterinarioService veterinarioService;

    /**
     * Inyección por constructor recomendada para tener el servicio disponible.
     */
    public VeterinarioController(VeterinarioService veterinarioService) {
        this.veterinarioService = veterinarioService;
    }

    /**
     * GET /login-veterinario
     *
     * Muestra el formulario de inicio de sesión del veterinario.
     * Simplemente retorna el nombre lógico de la plantilla Thymeleaf
     * login-veterinario es el archivo
     * templates/login-veterinario.html.
     */
    @GetMapping("/login-veterinario")
    public String mostrarLoginForm() {
        return "login-veterinario";
    }

    /**
     * POST /login-veterinario
     *
     * Procesa las credenciales enviadas desde el formulario.
     *   Lee los parámetros nombreUsuario y contrasenia.
     *   Llama a {@code veterinarioService.validarVeterinario(...)} para
     *       comprobar si existe un veterinario con esas credenciales.
     *   Si la validación es exitosa, redirige a /mascotas
     *       (listado de pacientes).
     *   Si falla, agrega un atributo error al modelo y vuelve
     *       a mostrar el formulario.
     *
     * El retorno "redirect:/mascotas" aplica el patrón
     * PRG (Post-Redirect-Get), evitando reenvíos del formulario si el usuario
     * refresca la página.
     */
    @PostMapping("/login-veterinario")
    public String procesarLogin(
            @RequestParam("nombreUsuario") String nombreUsuario,
            @RequestParam("contrasenia") String contrasenia,
            Model model) {

        // Intenta autenticar al veterinario. Si no existe o la clave no coincide,
        // el servicio devolverá null.
        Veterinario veterinario =
                veterinarioService.validarVeterinario(nombreUsuario, contrasenia);

        if (veterinario != null) {
            // Credenciales correctas → redirige al listado de mascotas.
            return "redirect:/mascotas";
        } else {
            // Credenciales incorrectas → vuelve al login con un mensaje de error.
            model.addAttribute("error", "Credenciales incorrectas");
            return "login-veterinario";
        }
    }
}
