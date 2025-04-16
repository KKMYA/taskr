<?php

namespace App\Controller;

use App\Repository\TaskRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/tasks', name: 'api_tasks_')]
class TaskController extends AbstractController
{
    #[Route('', name: 'list', methods: ['GET'])]
    public function index(TaskRepository $taskRepository): JsonResponse
    {
        $user = $this->getUser();
    
        if (!$user) {
            return $this->json(['error' => 'Unauthorized'], 401);
        }
    
        $tasks = $taskRepository->findBy(['user' => $user]);
    
        return $this->json($tasks, 200, [], ['groups' => 'task:read']);
    }
    
}
