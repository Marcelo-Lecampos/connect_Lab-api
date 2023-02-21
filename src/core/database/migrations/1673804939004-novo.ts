import { MigrationInterface, QueryRunner } from "typeorm";

export class novo1673804939004 implements MigrationInterface {
    name = 'novo1673804939004'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_address" ("_id" SERIAL NOT NULL, "zipCode" character varying(8) NOT NULL, "street" character varying(100) NOT NULL, "number" integer NOT NULL, "neighborhood" character varying(50) NOT NULL, "city" character varying(50) NOT NULL, "state" character varying(2) NOT NULL, "complement" character varying(100), CONSTRAINT "PK_6a2ee62124e1243be0c1ca7b45c" PRIMARY KEY ("_id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("_id" SERIAL NOT NULL, "fullName" character varying NOT NULL, "photoUrl" character varying, "email" character varying NOT NULL, "password" character varying NOT NULL, "phone" character varying, "salt" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "role" "public"."users_role_enum" NOT NULL DEFAULT 'client', "address.id" integer, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "REL_3acacb9ac5d74f85bb3334596a" UNIQUE ("address.id"), CONSTRAINT "PK_46c438e5a956fb9c3e86e73e321" PRIMARY KEY ("_id"))`);
        await queryRunner.query(`CREATE TABLE "user_devices" ("_id" SERIAL NOT NULL, "is_on" boolean NOT NULL, "local" "public"."user_devices_local_enum" NOT NULL, "room" character varying(50) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, "device_id" integer, CONSTRAINT "PK_af4d2e7ed4b4cbc42a0f7311228" PRIMARY KEY ("_id"))`);
        await queryRunner.query(`CREATE TABLE "device_Info" ("_id" SERIAL NOT NULL, "virtual_id" character varying NOT NULL, "ip_address" character varying NOT NULL, "mac_address" character varying NOT NULL, "signal" character varying NOT NULL, CONSTRAINT "PK_ec093cc844d7bd4d2fb4eb7c979" PRIMARY KEY ("_id"))`);
        await queryRunner.query(`CREATE TABLE "devices" ("_id" SERIAL NOT NULL, "name" character varying NOT NULL, "type" character varying NOT NULL, "madeBy" character varying NOT NULL, "photoUrl" character varying NOT NULL, "info_id" integer, CONSTRAINT "REL_93ecd8ac0a3e858399d8a25c5d" UNIQUE ("info_id"), CONSTRAINT "PK_06e54be2989de9043573759c83a" PRIMARY KEY ("_id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_3acacb9ac5d74f85bb3334596a1" FOREIGN KEY ("address.id") REFERENCES "user_address"("_id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_devices" ADD CONSTRAINT "FK_28bd79e1b3f7c1168f0904ce241" FOREIGN KEY ("user_id") REFERENCES "users"("_id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_devices" ADD CONSTRAINT "FK_7c0755b2e06094d9dfb353a3772" FOREIGN KEY ("device_id") REFERENCES "devices"("_id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "devices" ADD CONSTRAINT "FK_93ecd8ac0a3e858399d8a25c5df" FOREIGN KEY ("info_id") REFERENCES "device_Info"("_id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "devices" DROP CONSTRAINT "FK_93ecd8ac0a3e858399d8a25c5df"`);
        await queryRunner.query(`ALTER TABLE "user_devices" DROP CONSTRAINT "FK_7c0755b2e06094d9dfb353a3772"`);
        await queryRunner.query(`ALTER TABLE "user_devices" DROP CONSTRAINT "FK_28bd79e1b3f7c1168f0904ce241"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_3acacb9ac5d74f85bb3334596a1"`);
        await queryRunner.query(`DROP TABLE "devices"`);
        await queryRunner.query(`DROP TABLE "device_Info"`);
        await queryRunner.query(`DROP TABLE "user_devices"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "user_address"`);
    }

}
