<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTManager;  // Import du service JWTManager

class AuthController extends AbstractController
{
    private JWTManager $jwtManager;  // Déclaration du JWTManager

    // Injection du JWTManager dans le constructeur
    public function __construct(JWTManager $jwtManager)
    {
        $this->jwtManager = $jwtManager;
    }

    #[Route('/api/login', name: 'api_login', methods: ['POST', 'OPTIONS'])]
    public function login(
        Request $request,
        UserRepository $usersRepository,
        UserPasswordHasherInterface $passwordHasher
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        $email = $data['email'] ?? null;
        $password = $data['password'] ?? null;

        // Vérification des informations
        if (!$email || !$password) {
            return new JsonResponse(['error' => 'Email et mot de passe requis'], 400);
        }

        $user = $usersRepository->findOneUserByEmail($email);

        if (!$user || !$passwordHasher->isPasswordValid($user, $password)) {
            return new JsonResponse(['error' => 'Identifiants invalides'], 401);
        }

        // Génération du token JWT
        $token = $this->jwtManager->create($user);

        // Retourne la réponse avec le token
        return new JsonResponse([
            'message' => 'Connexion réussie',
            'token' => $token,  // Ajout du token dans la réponse
            'user' => [
                'id' => $user->getId(),
                'email' => $user->getMail(),
                'roles' => $user->getRoles(),
                'prenom' => $user->getFirstName(),
                'nom' => $user->getLastName()
            ]
        ]);
    }
}
