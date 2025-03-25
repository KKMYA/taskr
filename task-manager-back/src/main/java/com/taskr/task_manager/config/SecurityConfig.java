package com.taskr.task_manager.config;

import com.taskr.task_manager.services.CustomUserDetailsService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity  // Active la configuration de Spring Security
public class SecurityConfig extends WebSecurityConfiguration {

    private final CustomUserDetailsService customUserDetailsService;

    // Injection par constructeur pour CustomUserDetailsService
    public SecurityConfig(CustomUserDetailsService customUserDetailsService) {
        this.customUserDetailsService = customUserDetailsService;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        // Utilisation de notre CustomUserDetailsService et de BCrypt pour l'authentification
        auth.userDetailsService(customUserDetailsService).passwordEncoder(passwordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable() // Désactive CSRF pour simplification (à ajuster en fonction des besoins)
            .authorizeRequests()
            .antMatchers("/login", "/register").permitAll()  // Permet l'accès public à /login et /register
            .anyRequest().authenticated()  // Toutes les autres requêtes nécessitent une authentification
            .and()
            .formLogin()
                .loginPage("/login")  // Page de login personnalisée
                .permitAll()  // Permet à tout le monde d'accéder à la page de login
            .and()
            .logout()
                .permitAll();  // Permet à tout le monde de se déconnecter
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();  // Utilisation de BCrypt pour encoder les mots de passe
    }
}
