package com.animalheart.animalheart.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class AliasController {

    /* ===================== DETALLE MASCOTA ===================== */
    @GetMapping("/tu-mascota/{id}")
    public String aliasTuMascota(@PathVariable Long id) {
        return "forward:/clientes/mascotas/" + id;
    }

    /* ===================== LISTADOS SIN REPETICIÓN ===================== */
    // Seguro: /lista-clientes -> /clientes/clientes
    @GetMapping("/lista-clientes")
    public String aliasListaClientes() {
        return "forward:/clientes/clientes";
    }

    // Seguro: /lista-mascotas -> /mascotas/mascotas
    @GetMapping("/lista-mascotas")
    public String aliasListaMascotas() {
        return "forward:/mascotas/mascotas";
    }

    /* ===================== LOGIN CLIENTE ===================== */
    @GetMapping("/login-cliente")
    public String aliasLoginClienteGet() {
        return "forward:/clientes/login-cliente";
    }
    @PostMapping("/login-cliente")
    public String aliasLoginClientePost() {
        return "forward:/clientes/login-cliente";
    }

    /* ===================== LOGIN VETERINARIO ===================== */
    @GetMapping("/veterinario/login")
    public String aliasLoginVetGet() {
        return "forward:/login-veterinario";
    }
    @PostMapping("/veterinario/login")
    public String aliasLoginVetPost() {
        return "forward:/login-veterinario";
    }

    /* ===================== LOGIN ADMIN ===================== */
    @GetMapping("/admin/login")
    public String aliasLoginAdminGet() {
        return "forward:/login-admin";
    }
    @PostMapping("/admin/login")
    public String aliasLoginAdminPost() {
        return "forward:/login-admin";
    }

    /* ===================== CONTACTO / AYUDA ===================== */
    @GetMapping("/ayuda")
    public String aliasContactoGet() {
        return "forward:/contacto";
    }
    @PostMapping("/ayuda")
    public String aliasContactoPost() {
        return "forward:/contacto";
    }

    /* ===================== MASCOTAS: CREAR / EDITAR ===================== */
    @GetMapping("/nueva-mascota")
    public String aliasNuevaMascotaGet() {
        return "forward:/mascotas/nueva";
    }
    @PostMapping("/nueva-mascota")
    public String aliasNuevaMascotaPost() {
        return "forward:/mascotas/nueva";
    }

    @GetMapping("/editar-mascota/{id}")
    public String aliasEditarMascotaGet(@PathVariable Long id) {
        return "forward:/mascotas/" + id + "/editar";
    }
    @PostMapping("/editar-mascota/{id}")
    public String aliasEditarMascotaPost(@PathVariable Long id) {
        return "forward:/mascotas/" + id + "/editar";
    }
}
