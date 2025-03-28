package com.taskr.task_manager.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import com.taskr.task_manager.repositories.UserRepository;
import com.taskr.task_manager.models.User;

@Configuration
public class SecurityConfig {

    private final UserRepository userRepository;

    public SecurityConfig(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Configuration de la sécurité avec un filtre et une authentification basique
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf().disable()
            .authorizeRequests()
            .requestMatchers("/api/authenticate").permitAll()  // Permet l'accès à l'authentification
            .anyRequest().authenticated()
            .and()
            .httpBasic(); // Utilisation de l'authentification HTTP basique

        return http.build();
    }

    // Création d'un UserDetailsService pour charger les utilisateurs depuis la base de données
    @Bean
    public UserDetailsService userDetailsService() {
        return username -> {
            // On cherche l'utilisateur dans la base de données
            Optional<AppUser> userOptional = userRepository.findByUsername(username);

            if (userOptional.isEmpty()) {
                throw new UsernameNotFoundException("User not found");
            }

            AppUser user = userOptional.get(); // Récupère l'utilisateur de l'Optional

            // Retourne un utilisateur avec le mot de passe et le rôle
            return User.builder()
                    .username(user.getUsername())
                    .password(user.getPassword())  // Assurez-vous que le mot de passe est déjà encodé
                    .roles("USER")  // Exemple de rôle
                    .build();
        };
    }

    // Bean pour encoder les mots de passe avec BCrypt
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
