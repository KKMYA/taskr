<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250401155339 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            DROP SEQUENCE users_user_id_seq CASCADE
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE messenger_messages (id BIGSERIAL NOT NULL, body TEXT NOT NULL, headers TEXT NOT NULL, queue_name VARCHAR(190) NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, available_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, delivered_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, PRIMARY KEY(id))
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_75EA56E0FB7336F0 ON messenger_messages (queue_name)
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_75EA56E0E3BD61CE ON messenger_messages (available_at)
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_75EA56E016BA31DB ON messenger_messages (delivered_at)
        SQL);
        $this->addSql(<<<'SQL'
            COMMENT ON COLUMN messenger_messages.created_at IS '(DC2Type:datetime_immutable)'
        SQL);
        $this->addSql(<<<'SQL'
            COMMENT ON COLUMN messenger_messages.available_at IS '(DC2Type:datetime_immutable)'
        SQL);
        $this->addSql(<<<'SQL'
            COMMENT ON COLUMN messenger_messages.delivered_at IS '(DC2Type:datetime_immutable)'
        SQL);
        $this->addSql(<<<'SQL'
            CREATE OR REPLACE FUNCTION notify_messenger_messages() RETURNS TRIGGER AS $$
                BEGIN
                    PERFORM pg_notify('messenger_messages', NEW.queue_name::text);
                    RETURN NEW;
                END;
            $$ LANGUAGE plpgsql;
        SQL);
        $this->addSql(<<<'SQL'
            DROP TRIGGER IF EXISTS notify_trigger ON messenger_messages;
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TRIGGER notify_trigger AFTER INSERT OR UPDATE ON messenger_messages FOR EACH ROW EXECUTE PROCEDURE notify_messenger_messages();
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE task
        SQL);
        $this->addSql(<<<'SQL'
            ALTER INDEX roles_name_key RENAME TO UNIQ_B63E2EC75E237E06
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE users DROP CONSTRAINT users_pkey
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE users ADD id SERIAL NOT NULL
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE users ADD roles JSON NOT NULL
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE users ADD password VARCHAR(255) NOT NULL
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE users DROP user_id
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE users DROP pwd
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE users ALTER user_role_id DROP DEFAULT
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE users ALTER user_role_id DROP NOT NULL
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE users ALTER mail TYPE VARCHAR(180)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE users ADD PRIMARY KEY (id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER INDEX users_mail_key RENAME TO UNIQ_IDENTIFIER_MAIL
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE SCHEMA public
        SQL);
        $this->addSql(<<<'SQL'
            CREATE SEQUENCE users_user_id_seq INCREMENT BY 1 MINVALUE 1 START 1
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE task (id BIGINT NOT NULL, completed BOOLEAN NOT NULL, description VARCHAR(255) DEFAULT NULL, title VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE messenger_messages
        SQL);
        $this->addSql(<<<'SQL'
            ALTER INDEX uniq_b63e2ec75e237e06 RENAME TO roles_name_key
        SQL);
        $this->addSql(<<<'SQL'
            DROP INDEX users_pkey
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE "users" ADD user_id BIGSERIAL NOT NULL
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE "users" ADD pwd VARCHAR(50) NOT NULL
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE "users" DROP id
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE "users" DROP roles
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE "users" DROP password
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE "users" ALTER user_role_id SET DEFAULT 1
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE "users" ALTER user_role_id SET NOT NULL
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE "users" ALTER mail TYPE VARCHAR(50)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE "users" ADD PRIMARY KEY (user_id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER INDEX uniq_identifier_mail RENAME TO users_mail_key
        SQL);
    }
}
