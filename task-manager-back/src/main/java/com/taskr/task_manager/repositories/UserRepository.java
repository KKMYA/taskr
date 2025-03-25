package com.taskr.task_manager.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.taskr.task_manager.models.User;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    org.springframework.security.core.userdetails.User findByUsername(String username);  // Méthode pour récupérer l'utilisateur par son nom d'utilisateur
}