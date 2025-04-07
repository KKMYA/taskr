<?php

namespace App\DataFixtures;

use App\Entity\Role;
use App\Entity\User;
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
        //Rôle admin
        $adminRole = new Role();
        $adminRole->setName('ROLE_ADMIN');
        $manager->persist($adminRole);

        //Rôle user
        $userRole = new Role();
        $userRole->setName('ROLE_USER');
        $manager->persist($userRole);

        //Utilisateur admin
        $admin = new User();
        $admin->setMail('admin@example.com');
        $admin->setFirstName('Super');
        $admin->setLastName('Admin');
        $admin->setRole($adminRole);
        $admin->setPassword(
            $this->passwordHasher->hashPassword($admin, 'adminpass')
        );
        $admin->setRoles(['ROLE_ADMIN']);
        $manager->persist($admin);

        $faker = Factory::create('fr_FR');

        //Boucle pour la création de 10 fixtures avec rôle "user", données Françaises
        for ($i = 0; $i < 10; $i++) {
            $user = new User();
            $user->setFirstName($faker->firstName);
            $user->setLastName($faker->lastName);
            $user->setMail($faker->unique()->safeEmail);
            $user->setRole($userRole);
            $user->setPassword(
                $this->passwordHasher->hashPassword($user, 'password')
            );
            $user->setRoles(['ROLE_USER']);
    
            $manager->persist($user);
        }

        $manager->flush();
    }

}
