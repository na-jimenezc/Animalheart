package com.animalheart.animalheart; // Paquete raíz de la aplicación. 

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Aplicación principal de Animalheart.
 *
 * Esta clase es el punto de entrada de la aplicación Spring Boot.
 * Al ejecutarse, inicializa el contexto de Spring, realiza la configuración
 * automática (auto-configuration) y levanta el servidor embebido (por defecto Tomcat),
 * dejando disponibles los controladores, servicios y repositorios que estén en el
 * paquete {@code com.animalheart.animalheart} y sus subpaquetes.
 */
@SpringBootApplication
/* 
 * @SpringBootApplication es un "meta-anotación" que combina:
 *  - @Configuration: permite registrar beans con métodos @Bean.
 *  - @EnableAutoConfiguration: configura automáticamente componentes según dependencias del classpath.
 *  - @ComponentScan: escanea componentes (@Controller, @Service, @Repository, @Component)
 *    a partir de este paquete (com.animalheart.animalheart) hacia abajo.
 */
public class AnimalheartApplication {

    /**
     * Método main estándar de Java.
     *
     * Delegamos en {@link SpringApplication#run} para:
     * 1) Crear y configurar el contexto de Spring.
     * 2) Aplicar la auto-configuración.
     * 3) Levantar el servidor embebido y exponer los endpoints.
     *
     * @param args argumentos de línea de comandos
     */
    public static void main(String[] args) {
        SpringApplication.run(AnimalheartApplication.class, args);
    }

}
