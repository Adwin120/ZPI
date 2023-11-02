-- MySQL Script generated by MySQL Workbench
-- Mon Oct 30 19:59:08 2023
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema db_main
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema db_main
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `db_main` DEFAULT CHARACTER SET utf8 ;
USE `db_main` ;

-- -----------------------------------------------------
-- Table `db_main`.`Pracownik`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_main`.`Pracownik` (
  `idPracownik` INT NOT NULL,
  `Email` VARCHAR(45) NULL,
  `Hasło` VARCHAR(45) NULL,
  `Imię` VARCHAR(45) NULL,
  `Nazwisko` VARCHAR(45) NULL,
  `Telefon` VARCHAR(20) NULL,
  PRIMARY KEY (`idPracownik`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_main`.`Modele`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_main`.`Modele` (
  `idModele` INT NOT NULL,
  `Marka` VARCHAR(45) NULL,
  `Model` VARCHAR(45) NULL,
  PRIMARY KEY (`idModele`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_main`.`Klient`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_main`.`Klient` (
  `idKlient` INT NOT NULL,
  PRIMARY KEY (`idKlient`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_main`.`Auto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_main`.`Auto` (
  `idAuto` INT NOT NULL,
  `Modele_idModele` INT NOT NULL,
  `Klient_idKlient` INT NOT NULL,
  `Rejestracja` VARCHAR(20) NULL,
  `Czas_rozpoczecia` TIMESTAMP NULL,
  `Czas_zakonczenia` TIMESTAMP NULL,
  `Dodatkowe_informacje` VARCHAR(45) NULL,
  PRIMARY KEY (`idAuto`, `Klient_idKlient`),
  INDEX `fk_Auto_Modele1_idx` (`Modele_idModele` ASC) VISIBLE,
  INDEX `fk_Auto_Klient1_idx` (`Klient_idKlient` ASC) VISIBLE,
  CONSTRAINT `fk_Auto_Modele1`
    FOREIGN KEY (`Modele_idModele`)
    REFERENCES `db_main`.`Modele` (`idModele`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Auto_Klient1`
    FOREIGN KEY (`Klient_idKlient`)
    REFERENCES `db_main`.`Klient` (`idKlient`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_main`.`Grafik`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_main`.`Grafik` (
  `idGrafik` INT NOT NULL,
  `Pracownik_idPracownik` INT NOT NULL,
  `Klient_idKlient` INT NOT NULL,
  PRIMARY KEY (`idGrafik`, `Klient_idKlient`),
  INDEX `fk_Grafik_Pracownik_idx` (`Pracownik_idPracownik` ASC) VISIBLE,
  INDEX `fk_Grafik_Klient1_idx` (`Klient_idKlient` ASC) VISIBLE,
  CONSTRAINT `fk_Grafik_Pracownik`
    FOREIGN KEY (`Pracownik_idPracownik`)
    REFERENCES `db_main`.`Pracownik` (`idPracownik`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Grafik_Klient1`
    FOREIGN KEY (`Klient_idKlient`)
    REFERENCES `db_main`.`Klient` (`idKlient`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_main`.`Zgloszenie`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_main`.`Zgloszenie` (
  `idŻądanie` INT NOT NULL,
  `Pracownik_idPracownik` INT NOT NULL,
  `Klient_idKlient` INT NOT NULL,
  `Opis` VARCHAR(45) NULL,
  `Status` VARCHAR(45) NULL,
  PRIMARY KEY (`idŻądanie`),
  INDEX `fk_Żądanie_Pracownik1_idx` (`Pracownik_idPracownik` ASC) VISIBLE,
  INDEX `fk_Żądanie_Klient1_idx` (`Klient_idKlient` ASC) VISIBLE,
  CONSTRAINT `fk_Żądanie_Pracownik1`
    FOREIGN KEY (`Pracownik_idPracownik`)
    REFERENCES `db_main`.`Pracownik` (`idPracownik`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Żądanie_Klient1`
    FOREIGN KEY (`Klient_idKlient`)
    REFERENCES `db_main`.`Klient` (`idKlient`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_main`.`Auto_Pracownik`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_main`.`Auto_Pracownik` (
  `Pracownik_idPracownik` INT NOT NULL,
  `Auto_idAuto` INT NOT NULL,
  PRIMARY KEY (`Pracownik_idPracownik`, `Auto_idAuto`),
  INDEX `fk_Pracownik_has_Auto_Auto1_idx` (`Auto_idAuto` ASC) VISIBLE,
  INDEX `fk_Pracownik_has_Auto_Pracownik1_idx` (`Pracownik_idPracownik` ASC) VISIBLE,
  CONSTRAINT `fk_Pracownik_has_Auto_Pracownik1`
    FOREIGN KEY (`Pracownik_idPracownik`)
    REFERENCES `db_main`.`Pracownik` (`idPracownik`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Pracownik_has_Auto_Auto1`
    FOREIGN KEY (`Auto_idAuto`)
    REFERENCES `db_main`.`Auto` (`idAuto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_main`.`Usługa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_main`.`Usługa` (
  `idUsługa` INT NOT NULL,
  `Opis` VARCHAR(45) NULL,
  PRIMARY KEY (`idUsługa`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_main`.`Auto_Usługa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_main`.`Auto_Usługa` (
  `Auto_idAuto` INT NOT NULL,
  `Usługa_idUsługa` INT NOT NULL,
  PRIMARY KEY (`Auto_idAuto`, `Usługa_idUsługa`),
  INDEX `fk_Auto_has_Usługa_Usługa1_idx` (`Usługa_idUsługa` ASC) VISIBLE,
  INDEX `fk_Auto_has_Usługa_Auto1_idx` (`Auto_idAuto` ASC) VISIBLE,
  CONSTRAINT `fk_Auto_has_Usługa_Auto1`
    FOREIGN KEY (`Auto_idAuto`)
    REFERENCES `db_main`.`Auto` (`idAuto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Auto_has_Usługa_Usługa1`
    FOREIGN KEY (`Usługa_idUsługa`)
    REFERENCES `db_main`.`Usługa` (`idUsługa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_main`.`Umowa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_main`.`Umowa` (
  `idUmowa` INT NOT NULL,
  `Klient_idKlient` INT NOT NULL,
  PRIMARY KEY (`idUmowa`),
  INDEX `fk_Umowa_Klient1_idx` (`Klient_idKlient` ASC) VISIBLE,
  CONSTRAINT `fk_Umowa_Klient1`
    FOREIGN KEY (`Klient_idKlient`)
    REFERENCES `db_main`.`Klient` (`idKlient`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_main`.`Wersja_umowy`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_main`.`Wersja_umowy` (
  `Usługa_idUsługa` INT NOT NULL,
  `Umowa_idUmowa` INT NOT NULL,
  `Cena` FLOAT(10) NULL,
  PRIMARY KEY (`Usługa_idUsługa`, `Umowa_idUmowa`),
  INDEX `fk_Usługa_has_Umowa_Umowa1_idx` (`Umowa_idUmowa` ASC) VISIBLE,
  INDEX `fk_Usługa_has_Umowa_Usługa1_idx` (`Usługa_idUsługa` ASC) VISIBLE,
  CONSTRAINT `fk_Usługa_has_Umowa_Usługa1`
    FOREIGN KEY (`Usługa_idUsługa`)
    REFERENCES `db_main`.`Usługa` (`idUsługa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Usługa_has_Umowa_Umowa1`
    FOREIGN KEY (`Umowa_idUmowa`)
    REFERENCES `db_main`.`Umowa` (`idUmowa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;