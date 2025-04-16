<?php

namespace App\DataFixtures;

use App\Entity\Role;
use App\Entity\User;
use App\Entity\Task;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Faker\Factory;

class AppFixtures extends Fixture
{
    public function __construct(
        private readonly UserPasswordHasherInterface $passwordHasher
    ) {}

    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');

        // === ROLES ===
        $adminRole = new Role();
        $adminRole->setName('ROLE_ADMIN');
        $manager->persist($adminRole);

        $userRole = new Role();
        $userRole->setName('ROLE_USER');
        $manager->persist($userRole);

        // === UTILISATEUR ADMIN ===
        $admin = new User();
        $admin->setMail('admin@example.com');
        $admin->setFirstName('Super');
        $admin->setLastName('Admin');
        $admin->setRole($adminRole);
        $admin->setPassword($this->passwordHasher->hashPassword($admin, 'adminpass'));
        $admin->setRoles(['ROLE_ADMIN']);
        $manager->persist($admin);

        $users = [$admin]; // on ajoute aussi l'admin dans le tableau

        // === 10 UTILISATEURS CLASSIQUES ===
        for ($i = 0; $i < 10; $i++) {
            $user = new User();
            $user->setFirstName($faker->firstName);
            $user->setLastName($faker->lastName);
            $user->setMail($faker->unique()->safeEmail);
            $user->setRole($userRole);
            $user->setPassword($this->passwordHasher->hashPassword($user, 'password'));
            $user->setRoles(['ROLE_USER']);
            $manager->persist($user);

            $users[] = $user;
        }

        // === 30 TÂCHES ASSOCIÉES À DES UTILISATEURS ALÉATOIRES ===
        for ($i = 0; $i < 30; $i++) {
            $task = new Task();
            $task->setTitle($faker->sentence(4));
            $task->setDescription($faker->optional()->paragraph);
            $task->setIsDone($faker->boolean(30));
            $task->setCreatedAt(\DateTimeImmutable::createFromMutable(
                $faker->dateTimeBetween('-2 months', 'now')
            ));

            // Choisir un utilisateur au hasard dans la liste
            $user = $faker->randomElement($users);
            $task->setUser($user);

            $manager->persist($task);
        }

        $manager->flush();
    }
}
