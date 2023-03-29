import { MigrationInterface, QueryRunner } from "typeorm";

export class createAll1678463567363 implements MigrationInterface {
    name = 'createAll1678463567363'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "addresses" ("id" SERIAL NOT NULL, "street" character varying(45) NOT NULL, "zipCode" character varying(8) NOT NULL, "number" character varying(7), "city" character varying(20) NOT NULL, "state" character varying(2) NOT NULL, CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "User" ("id" SERIAL NOT NULL, "name" character varying(45) NOT NULL, "email" character varying(45) NOT NULL, "admin" boolean NOT NULL DEFAULT false, "password" character varying(120) NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), "deletedAt" date, CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shedules_users_propertie" ("id" SERIAL NOT NULL, "date" date NOT NULL, "hour" TIME NOT NULL, "userId" integer, "realEstateId" integer, CONSTRAINT "PK_3b390506561a89ca1beb8b2df0f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "RealEstate" ("id" SERIAL NOT NULL, "sold" boolean NOT NULL DEFAULT false, "size" integer NOT NULL, "value" numeric(12,2) NOT NULL DEFAULT '0', "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), "categoryId" integer, "addressId" integer, CONSTRAINT "REL_5cddc16f08ac35e548b39a3fa9" UNIQUE ("addressId"), CONSTRAINT "PK_1e80687649717ed24e73ed8ba9f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" SERIAL NOT NULL, "name" character varying(45) NOT NULL, CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "shedules_users_propertie" ADD CONSTRAINT "FK_f3fd3587dd2700c5521a733c2d2" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shedules_users_propertie" ADD CONSTRAINT "FK_ef9fc6af70a48b5772122e89f89" FOREIGN KEY ("realEstateId") REFERENCES "RealEstate"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "RealEstate" ADD CONSTRAINT "FK_c1d671b3d17bccc9f9340381a5e" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "RealEstate" ADD CONSTRAINT "FK_5cddc16f08ac35e548b39a3fa9d" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "RealEstate" DROP CONSTRAINT "FK_5cddc16f08ac35e548b39a3fa9d"`);
        await queryRunner.query(`ALTER TABLE "RealEstate" DROP CONSTRAINT "FK_c1d671b3d17bccc9f9340381a5e"`);
        await queryRunner.query(`ALTER TABLE "shedules_users_propertie" DROP CONSTRAINT "FK_ef9fc6af70a48b5772122e89f89"`);
        await queryRunner.query(`ALTER TABLE "shedules_users_propertie" DROP CONSTRAINT "FK_f3fd3587dd2700c5521a733c2d2"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "RealEstate"`);
        await queryRunner.query(`DROP TABLE "shedules_users_propertie"`);
        await queryRunner.query(`DROP TABLE "User"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
    }

}
