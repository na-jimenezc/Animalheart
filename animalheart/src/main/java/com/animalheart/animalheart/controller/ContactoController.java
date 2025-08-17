package com.animalheart.animalheart.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

/**
 * Controlador MVC para la página de Contacto.
 *
 * Expone dos endpoints:
 * 
 *   GET /contacto</b>: muestra el formulario y, si viene del POST exitoso,
 *       enseña un mensaje de confirmación.</li>
 *   POST /contacto</b>: procesa los datos enviados y aplica PRG
 *       (Post-Redirect-Get) para evitar reenvíos al recargar.</li>
 *
 * Ubicación de la vista: {@code src/main/resources/templates/contacto.html}
 */
@Controller
public class ContactoController {

    /**
     * Muestra el formulario de contacto.
     *
     * @param ok parámetro opcional ({@code ?ok=1}) que indica que venimos de un POST exitoso.
     * @param model modelo para pasar atributos a la vista.
     * @return el nombre lógico de la plantilla Thymeleaf: {@code "contacto"}.
     */
    @GetMapping("/contacto")
    public String mostrarFormulario(@RequestParam(value = "ok", required = false) String ok,
                                    Model model) {
        // Si venimos de un POST exitoso redirigido (PRG), muestra un mensaje en la vista.
        if (ok != null) {
            model.addAttribute("mensajeExito",
                    "¡Gracias! Recibimos tu mensaje y te contactaremos pronto.");
        }

        // Renderiza templates/contacto.html
        return "contacto";
    }

    /**
     * Procesa el envío del formulario de contacto.
     *
     * @param nombre   nombre de quien escribe (requerido).
     * @param email    correo electrónico (requerido).
     * @param telefono teléfono de contacto (opcional).
     * @param asunto   asunto del mensaje (requerido).
     * @param mensaje  cuerpo del mensaje (requerido).
     * @param ra       RedirectAttributes para pasar parámetros durante el redirect.
     * @return redirección a {@code /contacto} siguiendo el patrón PRG.
     */
    @PostMapping("/contacto")
    public String procesarFormulario(@RequestParam String nombre,
                                     @RequestParam String email,
                                     @RequestParam(required = false) String telefono,
                                     @RequestParam String asunto,
                                     @RequestParam String mensaje,
                                     RedirectAttributes ra) {

        // Validaciones del lado servidor (Bean Validation o manuales).
        //  - Verificar formato de email, longitudes, campos vacíos, etc.
        //  - Si hay errores: usar ra.addFlashAttribute("errores", ...) y redirigir a /contacto.

        // PRG (Post-Redirect-Get): evita reenvíos al refrescar la página.
        // Enviamos un indicador "ok" para que el GET muestre el mensaje de éxito.
        ra.addAttribute("ok", "1");
        return "redirect:/contacto";
    }
}
