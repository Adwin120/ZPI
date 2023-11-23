INSERT INTO `db_main`.`Klient` (`Adres`, `Email`, `Nazwa`, `NIP`, `Telefon`) 
VALUES 
('ul. Auto-Moto 1, 00-001 Warszawa', 'warszawa.auto@example.com', 'Auto-Moto Warszawa', '1234567890', '+48 123 456 789'),
('ul. CarWorld 2, 11-002 Kraków', 'carworld.krakow@example.com', 'CarWorld Kraków', '0987654321', '+48 987 654 321'),
('ul. Motoplaza 3, 22-003 Wroclaw', 'motoplaza.wroclaw@example.com', 'Motoplaza Wroclaw', '3456789012', '+48 345 678 901'),
('ul. AutoExpress 4, 33-004 Gdańsk', 'autoexpress.gdansk@example.com', 'AutoExpress Gdańsk', '2345678901', '+48 234 567 890'),
('ul. SpeedCars 5, 44-005 lódź', 'speedcars.lodz@example.com', 'SpeedCars lódź', '5678901234', '+48 567 890 123'),
('ul. MotorLine 6, 55-006 Poznań', 'motorline.poznan@example.com', 'MotorLine Poznań', '4567890123', '+48 456 789 012'),
('ul. AutoDream 7, 66-007 Katowice', 'autodream.katowice@example.com', 'AutoDream Katowice', '7890123456', '+48 789 012 345'),
('ul. CarZone 8, 77-008 Lublin', 'carzone.lublin@example.com', 'CarZone Lublin', '6789012345', '+48 678 901 234'),
('ul. FastWheels 9, 88-009 Rzeszów', 'fastwheels.rzeszow@example.com', 'FastWheels Rzeszów', '8901234567', '+48 890 123 456'),
('ul. AutoSpeed 10, 99-010 Bydgoszcz', 'autospeed.bydgoszcz@example.com', 'AutoSpeed Bydgoszcz', '4567123456', '+48 456 712 345');



INSERT INTO `db_main`.`Model` (`Marka`, `Model`)
VALUES
('Ford', 'Escape'),
('Ford', 'Mustang'),
('Ford', 'Explorer'),
('Ford', 'Edge'),
('Ford', 'F-150'),
('Ford', 'Fusion'),
('Ford', 'Expedition'),
('Volkswagen', 'Tiguan'),
('Volkswagen', 'Jetta'),
('Volkswagen', 'Atlas'),
('Volkswagen', 'Passat'),
('Volkswagen', 'Golf Alltrack'),
('Volkswagen', 'Arteon'),
('Volkswagen', 'Touareg'),
('Toyota', 'Camry'),
('Toyota', 'RAV4'),
('Toyota', 'Corolla'),
('Toyota', 'Highlander'),
('Toyota', 'Tacoma'),
('Toyota', 'Sienna'),
('Toyota', 'Prius'),
('Honda', 'Civic'),
('Honda', 'CR-V'),
('Honda', 'Pilot'),
('Honda', 'Accord'),
('Honda', 'Fit'),
('Honda', 'HR-V'),
('Honda', 'Insight'),
('Chevrolet', 'Equinox'),
('Chevrolet', 'Malibu'),
('Chevrolet', 'Silverado'),
('Chevrolet', 'Traverse'),
('Chevrolet', 'Cruze'),
('Chevrolet', 'Tahoe'),
('Chevrolet', 'Impala'),
('Ford', 'Ranger'),
('Ford', 'Bronco'),
('Ford', 'Escape Hybrid'),
('Ford', 'Mustang Mach-E'),
('Volkswagen', 'Golf SportWagen'),
('Volkswagen', 'Jetta GLI'),
('Volkswagen', 'Tiguan Allspace'),
('Volkswagen', 'e-Golf'),
('Toyota', 'Sienna Hybrid'),
('Toyota', 'Tundra'),
('Toyota', 'Prius Prime'),
('Toyota', 'Avalon'),
('Honda', 'Civic Type R'),
('Honda', 'Passport'),
('Honda', 'Fit Hybrid'),
('Honda', 'CR-V Hybrid'),
('Chevrolet', 'Trax'),
('Chevrolet', 'Bolt EV'),
('Chevrolet', 'Spark'),
('Chevrolet', 'Trailblazer'),
('Nissan', 'Rogue'),
('Nissan', 'Sentra'),
('Nissan', 'Murano'),
('Nissan', 'Kicks'),
('Kia', 'Soul'),
('Kia', 'Seltos'),
('Kia', 'Telluride'),
('Kia', 'Cadenza'),
('Mazda', 'MX-5 Miata'),
('Mazda', 'CX-30'),
('Mazda', 'CX-9'),
('Mazda', 'Mazda6');



INSERT INTO `db_main`.`Pracownik` (`Email`, `Imie`, `Nazwisko`, `Telefon`)
VALUES
('jan.kowalski@example.com', 'Jan', 'Kowalski', '+48 123 456 789'),
('anna.nowak@example.com', 'Anna', 'Nowak', '+48 987 654 321'),
('marek.wisniewski@example.com', 'Marek', 'Wiśniewski', '+48 345 678 901'),
('ewa.jankowska@example.com', 'Ewa', 'Jankowska', '+48 234 567 890'),
('pawel.kaczmarek@example.com', 'Paweł', 'Kaczmarek', '+48 567 890 123'),
('joanna.szmidt@example.com', 'Joanna', 'Szmidt', '+48 456 789 012'),
('piotr.wolski@example.com', 'Piotr', 'Wolski', '+48 789 012 345'),
('agnieszka.adamska@example.com', 'Agnieszka', 'Adamska', '+48 678 901 234'),
('adam.nowicki@example.com', 'Adam', 'Nowicki', '+48 890 123 456'),
('ewelina.mazur@example.com', 'Ewelina', 'Mazur', '+48 456 712 345'),
('michal.kowalczyk@example.com', 'Michał', 'Kowalczyk', '+48 789 123 456'),
('katarzyna.zajac@example.com', 'Katarzyna', 'Zając', '+48 567 234 567'),
('tomasz.wrobel@example.com', 'Tomasz', 'Wróbel', '+48 234 678 901'),
('patrycja.lewandowska@example.com', 'Patrycja', 'Lewandowska', '+48 901 345 678'),
('piotr.kaczmarek@example.com', 'Piotr', 'Kaczmarek', '+48 678 456 789'),
('agnieszka.adamczak@example.com', 'Agnieszka', 'Adamczak', '+48 567 567 890'),
('damian.nowakowski@example.com', 'Damian', 'Nowakowski', '+48 456 678 901'),
('julia.kowal@example.com', 'Julia', 'Kowal', '+48 345 789 012'),
('adam.zajac@example.com', 'Adam', 'Zając', '+48 234 890 123'),
('marta.kowalska@example.com', 'Marta', 'Kowalska', '+48 123 901 234');


INSERT INTO `db_main`.`Auto` (`Model_IdModel`, `Klient_IdKlient`, `Rejestracja`, `Czas_rozpoczecia`, `Czas_zakonczenia`, `Dodatkowe_informacje`)
VALUES
(1, 1, 'WAR-12345', '2023-11-08 09:00:00', '2023-11-08 17:00:00', 'Uszkodzenia: brak'),
(2, 2, 'KRA-67890', '2023-11-09 10:00:00', '2023-11-09 18:00:00', 'Uszkodzenia: drobne rysy'),
(3, 3, 'WRO-34567', '2023-11-10 08:30:00', '2023-11-10 16:30:00', 'Uszkodzenia: brak'),
(4, 4, 'GDA-23456', '2023-11-11 08:00:00', '2023-11-11 16:00:00', 'Uszkodzenia: brak'),
(5, 5, 'LOD-78901', '2023-11-12 09:30:00', '2023-11-12 17:30:00', 'Uszkodzenia: brak'),
(6, 6, 'POZ-45678', '2023-11-13 10:30:00', '2023-11-13 18:30:00', 'Uszkodzenia: lekka wgniotka'),
(7, 7, 'KAT-34567', '2023-11-14 11:30:00', '2023-11-14 19:30:00', 'Uszkodzenia: brak'),
(8, 8, 'LUB-98765', '2023-11-15 08:00:00', '2023-11-15 16:00:00', 'Uszkodzenia: rysy na karoserii'),
(9, 9, 'RZE-54321', '2023-11-16 09:30:00', '2023-11-16 17:30:00', 'Uszkodzenia: brak'),
(10, 10, 'BYD-67890', '2023-11-17 07:30:00', '2023-11-17 15:30:00', 'Uszkodzenia: brak'),
(11, 1, 'WAR-11111', '2023-11-18 09:00:00', '2023-11-18 17:00:00', 'Uszkodzenia: brak'),
(12, 2, 'KRA-22222', '2023-11-19 10:00:00', '2023-11-19 18:00:00', 'Uszkodzenia: rysy na boku'),
(13, 3, 'WRO-33333', '2023-11-20 08:30:00', '2023-11-20 16:30:00', 'Uszkodzenia: brak'),
(14, 4, 'GDA-44444', '2023-11-21 08:00:00', '2023-11-21 16:00:00', 'Uszkodzenia: lekka wgniotka'),
(15, 5, 'LOD-55555', '2023-11-22 09:30:00', '2023-11-22 17:30:00', 'Uszkodzenia: brak'),
(16, 6, 'POZ-66666', '2023-11-23 10:30:00', '2023-11-23 18:30:00', 'Uszkodzenia: brak'),
(17, 7, 'KAT-77777', '2023-11-24 11:30:00', '2023-11-24 19:30:00', 'Uszkodzenia: rysy na dachu'),
(18, 8, 'LUB-88888', '2023-11-25 08:00:00', '2023-11-25 16:00:00', 'Uszkodzenia: brak'),
(19, 9, 'RZE-99999', '2023-11-26 09:30:00', '2023-11-26 17:30:00', 'Uszkodzenia: brak'),
(20, 10, 'BYD-00000', '2023-11-27 07:30:00', '2023-11-27 15:30:00', 'Uszkodzenia: brak'),
(21, 1, 'WAR-98765', '2023-11-28 09:00:00', '2023-11-28 17:00:00', 'Uszkodzenia: lekka rysa na przedniej szybie'),
(22, 2, 'KRA-12345', '2023-11-29 10:00:00', '2023-11-29 18:00:00', 'Uszkodzenia: brak'),
(23, 3, 'WRO-23456', '2023-11-30 08:30:00', '2023-11-30 16:30:00', 'Uszkodzenia: rysy na bokach'),
(24, 4, 'GDA-34567', '2023-12-01 08:00:00', '2023-12-01 16:00:00', 'Uszkodzenia: brak'),
(25, 5, 'LOD-45678', '2023-12-02 09:30:00', '2023-12-02 17:30:00', 'Uszkodzenia: brak'),
(26, 6, 'POZ-56789', '2023-12-03 10:30:00', '2023-12-03 18:30:00', 'Uszkodzenia: rysa na masce'),
(27, 7, 'KAT-67890', '2023-12-04 11:30:00', '2023-12-04 19:30:00', 'Uszkodzenia: lekka wgniotka na tylnej klapie'),
(28, 8, 'LUB-78901', '2023-12-05 08:00:00', '2023-12-05 16:00:00', 'Uszkodzenia: brak'),
(29, 9, 'RZE-89012', '2023-12-06 09:30:00', '2023-12-06 17:30:00', 'Uszkodzenia: rysy na drzwiach'),
(30, 10, 'BYD-90123', '2023-12-07 07:30:00', '2023-12-07 15:30:00', 'Uszkodzenia: brak'),
(31, 1, 'WAR-11111', '2023-12-08 09:00:00', '2023-12-08 17:00:00', 'Uszkodzenia: brak'),
(32, 2, 'KRA-22222', '2023-12-09 10:00:00', '2023-12-09 18:00:00', 'Uszkodzenia: brak'),
(33, 3, 'WRO-33333', '2023-12-10 08:30:00', '2023-12-10 16:30:00', 'Uszkodzenia: rysy na boku'),
(34, 4, 'GDA-44444', '2023-12-11 08:00:00', '2023-12-11 16:00:00', 'Uszkodzenia: lekka rysa na dachu'),
(35, 5, 'LOD-55555', '2023-12-12 09:30:00', '2023-12-12 17:30:00', 'Uszkodzenia: brak'),
(36, 6, 'POZ-66666', '2023-12-13 10:30:00', '2023-12-13 18:30:00', 'Uszkodzenia: brak'),
(37, 7, 'KAT-77777', '2023-12-14 11:30:00', '2023-12-14 19:30:00', 'Uszkodzenia: brak'),
(38, 8, 'LUB-88888', '2023-12-15 08:00:00', '2023-12-15 16:00:00', 'Uszkodzenia: rysy na drzwiach'),
(39, 9, 'RZE-99999', '2023-12-16 09:30:00', '2023-12-16 17:30:00', 'Uszkodzenia: brak'),
(40, 10, 'BYD-00000', '2023-12-17 07:30:00', '2023-12-17 15:30:00', 'Uszkodzenia: brak');




INSERT INTO `db_main`.`Zgloszenie` (`Pracownik_IdPracownik`, `Klient_IdKlient`, `Opis`, `Status`)
VALUES
(1, 1, 'Klient zglosil rysy na boku auta.', 'Przeslane'),
(2, 2, 'Klient potrzebuje nowego zestawu myjącego do auta.', 'Odrzucone'),
(3, 3, 'Klient zglosil uszkodzenie lusterka w samochodzie.', 'Zaakceptowane'),
(4, 4, 'Klient zauważyl brak środka czyszczącego w salonie.', 'Przeslane'),
(5, 5, 'Klient zglosil problemy z dzialaniem odkurzacza na stacji mycia.', 'Odrzucone'),
(6, 6, 'Klient potrzebuje nowy worek do odkurzacza.', 'Zaakceptowane'),
(7, 7, 'Klient zglosil uszkodzenie przedniej szyby w samochodzie.', 'Przeslane'),
(8, 8, 'Klient potrzebuje nową wodę oczyszczoną do mycia auta.', 'Odrzucone'),
(9, 9, 'Klient zauważyl brak ręczników papierowych w salonie.', 'Zaakceptowane'),
(10, 10, 'Klient zglosil problemy z wycieraczkami w samochodzie.', 'Przeslane'),
(11, 1, 'Klient potrzebuje nowe gumki wycieraczek.', 'Odrzucone'),
(12, 2, 'Klient zglosil brak plynu do spryskiwaczy w samochodzie.', 'Zaakceptowane'),
(13, 3, 'Klient zauważyl brak rękawic ochronnych w salonie.', 'Przeslane'),
(14, 4, 'Klient potrzebuje nowy wąż do mycia auta.', 'Odrzucone'),
(15, 5, 'Klient zglosil uszkodzenie bieżnika opon w samochodzie.', 'Zaakceptowane'),
(16, 6, 'Klient zauważyl brak środka dezynfekującego w salonie.', 'Przeslane'),
(17, 7, 'Klient potrzebuje nową szczotkę do mycia auta.', 'Odrzucone'),
(18, 8, 'Klient zglosil problemy z dzialaniem stacji sprężonego powietrza.', 'Zaakceptowane'),
(19, 9, 'Klient zauważyl brak środków do mycia felg w salonie.', 'Przeslane'),
(20, 10, 'Klient potrzebuje nowy zapas opon zimowych.', 'Odrzucone'),
(21, 1, 'Klient zglosil brak plynu do hamulców w samochodzie.', 'Zaakceptowane'),
(22, 2, 'Klient zauważyl brak chlodziwa w salonie.', 'Przeslane'),
(23, 3, 'Klient potrzebuje nowy ręcznik do suszenia auta.', 'Odrzucone'),
(24, 4, 'Klient zglosil problemy z dzialaniem myjni ciśnieniowej.', 'Zaakceptowane'),
(25, 5, 'Klient zauważyl brak worków na śmieci w salonie.', 'Przeslane'),
(26, 6, 'Klient potrzebuje nowy wózek do transportu chemii.', 'Odrzucone'),
(27, 7, 'Klient zglosil brak baterii w odkurzaczu na stacji mycia.', 'Zaakceptowane'),
(28, 8, 'Klient zauważyl brak żarówki w samochodzie.', 'Przeslane'),
(29, 9, 'Klient potrzebuje nowy wąż sprężonego powietrza do mycia auta.', 'Odrzucone'),
(30, 10, 'Klient zglosil problemy z dzialaniem zamka w samochodzie.', 'Zaakceptowane');



INSERT INTO `db_main`.`Auto_Pracownik` (`Auto_IdAuto`, `Pracownik_IdPracownik`)
VALUES
(1, 1),
(1, 2),
(2, 2),
(2, 3),
(3, 3),
(4, 4),
(4, 5),
(5, 5),
(6, 6),
(6, 7),
(7, 7),
(8, 8),
(8, 9),
(9, 9),
(10, 10),
(10, 1),
(11, 1),
(11, 2),
(12, 2),
(12, 3),
(13, 3),
(14, 4),
(14, 5),
(15, 5),
(16, 6),
(16, 7),
(17, 7),
(18, 8),
(18, 9),
(19, 9),
(20, 10),
(20, 1),
(21, 1),
(21, 2),
(22, 2),
(22, 3),
(23, 3),
(24, 4),
(24, 5),
(25, 5),
(26, 6),
(26, 7),
(27, 7),
(28, 8),
(28, 9),
(29, 9),
(30, 10),
(30, 1),
(31, 1),
(31, 2),
(32, 2),
(32, 3),
(33, 3),
(34, 4),
(34, 5),
(35, 5),
(36, 6),
(36, 7),
(37, 7),
(38, 8),
(38, 9),
(39, 9),
(40, 10),
(40, 1);


INSERT INTO `db_main`.`Usluga` (`Opis`, `Nazwa`)
VALUES
('Pelne mycie zewnętrzne i wewnętrzne pojazdu, woskowanie i polerowanie lakieru.', 'Pelne Detailing'),
('Skupienie się na dokładnym czyszczeniu wnętrza samochodu, w tym tapicerki, deski rozdzielczej i szyb.', 'Detailing Wnętrza'),
('Usuwanie rys i wgnieceń z lakieru oraz odnawianie wyglądu karoserii.', 'Detailing Karoserii'),
('Woskowanie i polerowanie lakieru, aby nadać samochodowi lśniący wygląd.', 'Woskowanie i Polerowanie'),
('Usuwanie trudnych plam i zabrudzeń z tapicerki i dywanów.', 'Czyszczenie Tapicerki'),
('Czyszczenie i dezynfekcja wnętrza pojazdu, eliminacja nieprzyjemnych zapachów.', 'Dezynfekcja i Odświeżanie'),
('Czyszczenie felg i opon, aby przywrócić im blask i wygląd.', 'Czyszczenie Felg i Opon'),
('Usuwanie trudnych zabrudzeń i plam z lakieru oraz usuwanie owadów.', 'Usuwanie Trudnych Plam i Owadów'),
('Renowacja plastikowych elementów wewnątrz i na zewnątrz pojazdu.', 'Renowacja Plastików'),
('Detailing szyb i lusterka, aby zapewnić czysty i błyszczący widok.', 'Czyszczenie Szyb i Lusterka');



INSERT INTO `db_main`.`Auto_Usluga` (`Auto_IdAuto`, `Usluga_IdUsluga`)
VALUES
(1, 1), (1, 2), (1, 3),
(2, 2), (2, 4), (2, 5),
(3, 3), (3, 6),
(4, 1),
(5, 4), (5, 5),
(6, 6), (6, 7),
(7, 8),
(8, 9), (8, 10),
(9, 1), (9, 2),
(10, 3),
(11, 4), (11, 5), (11, 6),
(12, 7), (12, 8),
(13, 9),
(14, 10), (14, 1),
(15, 2), (15, 3),
(16, 4),
(17, 5), (17, 6), (17, 7),
(18, 8), (18, 9),
(19, 10),
(20, 1),
(21, 2),
(22, 4),
(23, 5), (23, 6),
(24, 7),
(25, 8), (25, 9),
(26, 10),
(27, 1),
(28, 2), (28, 3),
(29, 4),
(30, 5), (30, 6),
(31, 7),
(32, 8), (32, 9),
(33, 10),
(34, 1),
(35, 2), (35, 3),
(36, 4),
(37, 5), (37, 6),
(38, 7),
(39, 8), (39, 9),
(40, 10);


-- 50 przykladowych wpisów w tabeli Grafik z wartościami statusu, z co najmniej 10 wpisami na ten sam dzień
INSERT INTO `db_main`.`Grafik` (`Pracownik_IdPracownik`, `Klient_IdKlient`, `Czas_rozpoczecia`, `Czas_zakonczenia`, `Status`) 
VALUES
(1, 1, '2023-11-08 09:00:00', '2023-11-08 17:00:00', 'Przeslany')
(2, 2, '2023-11-08 09:00:00', '2023-11-08 17:00:00', 'Zaakceptowany')
(3, 3, '2023-11-08 09:00:00', '2023-11-08 17:00:00', 'Odrzucony')
(4, 4, '2023-11-08 09:00:00', '2023-11-08 17:00:00', 'Zmieniony')
(5, 5, '2023-11-08 09:00:00', '2023-11-08 17:00:00', 'Przeslany')
(6, 6, '2023-11-09 09:00:00', '2023-11-09 17:00:00', 'Zaakceptowany')
(7, 7, '2023-11-09 09:00:00', '2023-11-09 17:00:00', 'Odrzucony')
(8, 8, '2023-11-09 09:00:00', '2023-11-09 17:00:00', 'Zmieniony')
(9, 9, '2023-11-09 09:00:00', '2023-11-09 17:00:00', 'Przeslany')
(10, 10, '2023-11-10 09:00:00', '2023-11-10 17:00:00', 'Zaakceptowany')
(11, 1, '2023-11-10 09:00:00', '2023-11-10 17:00:00', 'Odrzucony')
(12, 2, '2023-11-10 09:00:00', '2023-11-10 17:00:00', 'Zmieniony')
(13, 3, '2023-11-10 09:00:00', '2023-11-10 17:00:00', 'Przeslany')
(14, 4, '2023-11-10 09:00:00', '2023-11-10 17:00:00', 'Zaakceptowany')
(15, 5, '2023-11-11 09:00:00', '2023-11-11 17:00:00', 'Odrzucony')
(16, 6, '2023-11-11 09:00:00', '2023-11-11 17:00:00', 'Zmieniony')
(17, 7, '2023-11-11 09:00:00', '2023-11-11 17:00:00', 'Przeslany')
(18, 8, '2023-11-11 09:00:00', '2023-11-11 17:00:00', 'Zaakceptowany')
(19, 9, '2023-11-12 09:00:00', '2023-11-12 17:00:00', 'Odrzucony')
(20, 10, '2023-11-12 09:00:00', '2023-11-12 17:00:00', 'Zmieniony')
(1, 2, '2023-12-01 09:00:00', '2023-12-01 17:00:00', 'Przeslany')
(2, 3, '2023-12-01 09:00:00', '2023-12-01 17:00:00', 'Zaakceptowany')
(3, 4, '2023-12-01 09:00:00', '2023-12-01 17:00:00', 'Odrzucony')
(4, 5, '2023-12-01 09:00:00', '2023-12-01 17:00:00', 'Zmieniony')
(5, 6, '2023-12-01 09:00:00', '2023-12-01 17:00:00', 'Przeslany')
(6, 7, '2023-12-02 09:00:00', '2023-12-02 17:00:00', 'Zaakceptowany')
(7, 8, '2023-12-02 09:00:00', '2023-12-02 17:00:00', 'Odrzucony')
(8, 9, '2023-12-02 09:00:00', '2023-12-02 17:00:00', 'Zmieniony')
(9, 10, '2023-12-02 09:00:00', '2023-12-02 17:00:00', 'Przeslany')
(10, 1, '2023-12-03 09:00:00', '2023-12-03 17:00:00', 'Zaakceptowany')
(11, 2, '2023-12-03 09:00:00', '2023-12-03 17:00:00', 'Odrzucony')
(12, 3, '2023-12-03 09:00:00', '2023-12-03 17:00:00', 'Zmieniony')
(13, 4, '2023-12-03 09:00:00', '2023-12-03 17:00:00', 'Przeslany')
(14, 5, '2023-12-03 09:00:00', '2023-12-03 17:00:00', 'Zaakceptowany')
(15, 6, '2023-12-04 09:00:00', '2023-12-04 17:00:00', 'Odrzucony')
(16, 7, '2023-12-04 09:00:00', '2023-12-04 17:00:00', 'Zmieniony')
(17, 8, '2023-12-04 09:00:00', '2023-12-04 17:00:00', 'Przeslany')
(18, 9, '2023-12-04 09:00:00', '2023-12-04 17:00:00', 'Zaakceptowany')
(19, 10, '2023-12-05 09:00:00', '2023-12-05 17:00:00', 'Odrzucony')
(20, 1, '2023-12-05 09:00:00', '2023-12-05 17:00:00', 'Zmieniony')
(1, 3, '2023-12-06 09:00:00', '2023-12-06 17:00:00', 'Przeslany')
(2, 4, '2023-12-06 09:00:00', '2023-12-06 17:00:00', 'Zaakceptowany')
(3, 5, '2023-12-07 09:00:00', '2023-12-07 17:00:00', 'Odrzucony')
(4, 6, '2023-12-07 09:00:00', '2023-12-07 17:00:00', 'Zmieniony')
(5, 7, '2023-12-08 09:00:00', '2023-12-08 17:00:00', 'Przeslany')
(6, 8, '2023-12-08 09:00:00', '2023-12-08 17:00:00', 'Zaakceptowany')
(7, 9, '2023-12-09 09:00:00', '2023-12-09 17:00:00', 'Odrzucony')
(8, 10, '2023-12-09 09:00:00', '2023-12-09 17:00:00', 'Zmieniony')
(9, 1, '2023-12-10 09:00:00', '2023-12-10 17:00:00', 'Przeslany')
(10, 2, '2023-12-10 09:00:00', '2023-12-10 17:00:00', 'Zaakceptowany')
(11, 3, '2023-12-11 09:00:00', '2023-12-11 17:00:00', 'Odrzucony')
(12, 4, '2023-12-11 09:00:00', '2023-12-11 17:00:00', 'Zmieniony')
(13, 5, '2023-12-12 09:00:00', '2023-12-12 17:00:00', 'Przeslany')
(14, 6, '2023-12-12 09:00:00', '2023-12-12 17:00:00', 'Zaakceptowany')
(15, 7, '2023-12-13 09:00:00', '2023-12-13 17:00:00', 'Odrzucony')
(16, 8, '2023-12-13 09:00:00', '2023-12-13 17:00:00', 'Zmieniony')
(17, 9, '2023-12-14 09:00:00', '2023-12-14 17:00:00', 'Przeslany')
(18, 10, '2023-12-14 09:00:00', '2023-12-14 17:00:00', 'Zaakceptowany')
(19, 1, '2023-12-15 09:00:00', '2023-12-15 17:00:00', 'Odrzucony')
(20, 2, '2023-12-15 09:00:00', '2023-12-15 17:00:00', 'Zmieniony')
(1, 3, '2023-12-16 09:00:00', '2023-12-16 17:00:00', 'Przeslany')
(2, 4, '2023-12-16 09:00:00', '2023-12-16 17:00:00', 'Zaakceptowany')
(3, 5, '2023-12-17 09:00:00', '2023-12-17 17:00:00', 'Odrzucony')
(4, 6, '2023-12-17 09:00:00', '2023-12-17 17:00:00', 'Zmieniony')
(5, 7, '2023-12-18 09:00:00', '2023-12-18 17:00:00', 'Przeslany')
(6, 8, '2023-12-18 09:00:00', '2023-12-18 17:00:00', 'Zaakceptowany')
(7, 9, '2023-12-19 09:00:00', '2023-12-19 17:00:00', 'Odrzucony')
(8, 10, '2023-12-19 09:00:00', '2023-12-19 17:00:00', 'Zmieniony')
(9, 1, '2023-12-20 09:00:00', '2023-12-20 17:00:00', 'Przeslany')
(10, 2, '2023-12-20 09:00:00', '2023-12-20 17:00:00', 'Zaakceptowany')
(11, 3, '2023-12-21 09:00:00', '2023-12-21 17:00:00', 'Odrzucony')
(12, 4, '2023-12-21 09:00:00', '2023-12-21 17:00:00', 'Zmieniony')
(13, 5, '2023-12-22 09:00:00', '2023-12-22 17:00:00', 'Przeslany')
(14, 6, '2023-12-22 09:00:00', '2023-12-22 17:00:00', 'Zaakceptowany')
(15, 7, '2023-12-23 09:00:00', '2023-12-23 17:00:00', 'Odrzucony')
(16, 8, '2023-12-23 09:00:00', '2023-12-23 17:00:00', 'Zmieniony')
(17, 9, '2023-12-24 09:00:00', '2023-12-24 17:00:00', 'Przeslany')
(18, 10, '2023-12-24 09:00:00', '2023-12-24 17:00:00', 'Zaakceptowany')
(19, 1, '2023-12-25 09:00:00', '2023-12-25 17:00:00', 'Odrzucony')
(20, 2, '2023-12-25 09:00:00', '2023-12-25 17:00:00', 'Zmieniony')
(1, 3, '2023-12-26 09:00:00', '2023-12-26 17:00:00', 'Przeslany')
(2, 4, '2023-12-26 09:00:00', '2023-12-26 17:00:00', 'Zaakceptowany')
(3, 5, '2023-12-27 09:00:00', '2023-12-27 17:00:00', 'Odrzucony')
(4, 6, '2023-12-27 09:00:00', '2023-12-27 17:00:00', 'Zmieniony')
(5, 7, '2023-12-28 09:00:00', '2023-12-28 17:00:00', 'Przeslany')
(6, 8, '2023-12-28 09:00:00', '2023-12-28 17:00:00', 'Zaakceptowany')
(7, 9, '2023-12-29 09:00:00', '2023-12-29 17:00:00', 'Odrzucony')
(8, 10, '2023-12-29 09:00:00', '2023-12-29 17:00:00', 'Zmieniony')
(9, 1, '2023-12-30 09:00:00', '2023-12-30 17:00:00', 'Przeslany')
(10, 2, '2023-12-30 09:00:00', '2023-12-30 17:00:00', 'Zaakceptowany')
(11, 3, '2023-12-31 09:00:00', '2023-12-31 17:00:00', 'Odrzucony')
(12, 4, '2023-12-31 09:00:00', '2023-12-31 17:00:00', 'Zmieniony')
(13, 5, '2024-01-01 09:00:00', '2024-01-01 17:00:00', 'Przeslany')
(14, 6, '2024-01-01 09:00:00', '2024-01-01 17:00:00', 'Zaakceptowany')
(15, 7, '2024-01-02 09:00:00', '2024-01-02 17:00:00', 'Odrzucony')
(16, 8, '2024-01-02 09:00:00', '2024-01-02 17:00:00', 'Zmieniony')
(17, 9, '2024-01-03 09:00:00', '2024-01-03 17:00:00', 'Przeslany')
(18, 10, '2024-01-03 09:00:00', '2024-01-03 17:00:00', 'Zaakceptowany')
(19, 1, '2024-01-04 09:00:00', '2024-01-04 17:00:00', 'Odrzucony')
(20, 2, '2024-01-04 09:00:00', '2024-01-04 17:00:00', 'Zmieniony');


-- 30 przykladowych umów z 10 klientami
INSERT INTO `db_main`.`Umowa` (`Klient_IdKlient`, `Data_rozpoczecia`, `Data_zakonczenia`)
VALUES
(1, '2023-01-01', '2023-12-31')
(2, '2023-02-01', '2024-01-31')
(3, '2023-03-01', '2024-02-29')
(4, '2023-04-01', '2024-03-31')
(5, '2023-05-01', '2024-04-30')
(6, '2023-06-01', '2024-05-31')
(7, '2023-07-01', '2024-06-30')
(8, '2023-08-01', '2024-07-31')
(9, '2023-09-01', '2024-08-31')
(10, '2023-10-01', '2024-09-30')
(1, '2023-11-01', '2024-10-31')
(2, '2023-12-01', '2024-11-30')
(3, '2024-01-01', '2024-12-31')
(4, '2024-02-01', '2025-01-31')
(5, '2024-03-01', '2025-02-28')
(6, '2024-04-01', '2025-03-31')
(7, '2024-05-01', '2025-04-30')
(8, '2024-06-01', '2025-05-31')
(9, '2024-07-01', '2025-06-30')
(10, '2024-08-01', '2025-07-31');


INSERT INTO `db_main`.`Wersja_umowy` (`Usluga_IdUsluga`, `Umowa_IdUmowa`, `Cena`)
VALUES
(1, 1, 100.00),
(2, 1, 150.00),
(3, 1, 120.00),
(4, 1, 130.00),
(5, 1, 110.00),
(6, 1, 90.00),
(7, 1, 80.00),
(8, 1, 140.00),
(9, 1, 105.00),
(10, 1, 115.00),
(1, 11, 110.00),
(2, 11, 160.00),
(3, 11, 130.00),
(4, 11, 140.00),
(5, 11, 120.00),
(6, 11, 100.00),
(7, 11, 90.00),
(8, 11, 150.00),
(9, 11, 115.00),
(10, 11, 125.00),
(1, 2, 100.00),
(2, 2, 150.00),
(3, 2, 120.00),
(4, 2, 130.00),
(5, 2, 110.00),
(6, 2, 90.00),
(7, 2, 80.00),
(8, 2, 140.00),
(9, 2, 105.00),
(10, 2, 115.00),
(1, 12, 110.00),
(2, 12, 160.00),
(3, 12, 130.00),
(4, 12, 140.00),
(5, 12, 120.00),
(6, 12, 100.00),
(7, 12, 90.00),
(8, 12, 150.00),
(9, 12, 115.00),
(10, 12, 125.00),
(1, 3, 100.00),
(2, 3, 150.00),
(3, 3, 120.00),
(4, 3, 130.00),
(5, 3, 110.00),
(6, 3, 90.00),
(7, 3, 80.00),
(8, 3, 140.00),
(9, 3, 105.00),
(10, 3, 115.00),
(1, 13, 110.00),
(2, 13, 160.00),
(3, 13, 130.00),
(4, 13, 140.00),
(5, 13, 120.00),
(6, 13, 100.00),
(7, 13, 90.00),
(8, 13, 150.00),
(9, 13, 115.00),
(10, 13, 125.00),
(1, 4, 100.00),
(2, 4, 150.00),
(3, 4, 120.00),
(4, 4, 130.00),
(5, 4, 110.00),
(6, 4, 90.00),
(7, 4, 80.00),
(8, 4, 140.00),
(9, 4, 105.00),
(10, 4, 115.00),
(1, 14, 110.00),
(2, 14, 160.00),
(3, 14, 130.00),
(4, 14, 140.00),
(5, 14, 120.00),
(6, 14, 100.00),
(7, 14, 90.00),
(8, 14, 150.00),
(9, 14, 115.00),
(10, 14, 125.00),
(1, 5, 100.00),
(2, 5, 150.00),
(3, 5, 120.00),
(4, 5, 130.00),
(5, 5, 110.00),
(6, 5, 90.00),
(7, 5, 80.00),
(8, 5, 140.00),
(9, 5, 105.00),
(10, 5, 115.00),
(1, 15, 110.00),
(2, 15, 160.00),
(3, 15, 130.00),
(4, 15, 140.00),
(5, 15, 120.00),
(6, 15, 100.00),
(7, 15, 90.00),
(8, 15, 150.00),
(9, 15, 115.00),
(10, 15, 125.00),
(1, 6, 100.00),
(2, 6, 150.00),
(3, 6, 120.00),
(4, 6, 130.00),
(5, 6, 110.00),
(6, 6, 90.00),
(7, 6, 80.00),
(8, 6, 140.00),
(9, 6, 105.00),
(10, 6, 115.00),
(1, 16, 110.00),
(2, 16, 160.00),
(3, 16, 130.00),
(4, 16, 140.00),
(5, 16, 120.00),
(6, 16, 100.00),
(7, 16, 90.00),
(8, 16, 150.00),
(9, 16, 115.00),
(10, 16, 125.00),
(1, 7, 100.00),
(2, 7, 150.00),
(3, 7, 120.00),
(4, 7, 130.00),
(5, 7, 110.00),
(6, 7, 90.00),
(7, 7, 80.00),
(8, 7, 140.00),
(9, 7, 105.00),
(10, 7, 115.00),
(1, 17, 110.00),
(2, 17, 160.00),
(3, 17, 130.00),
(4, 17, 140.00),
(5, 17, 120.00),
(6, 17, 100.00),
(7, 17, 90.00),
(8, 17, 150.00),
(9, 17, 115.00),
(10, 17, 125.00),
(1, 8, 100.00),
(2, 8, 150.00),
(3, 8, 120.00),
(4, 8, 130.00),
(5, 8, 110.00),
(6, 8, 90.00),
(7, 8, 80.00),
(8, 8, 140.00),
(9, 8, 105.00),
(10, 8, 115.00),
(1, 18, 110.00),
(2, 18, 160.00),
(3, 18, 130.00),
(4, 18, 140.00),
(5, 18, 120.00),
(6, 18, 100.00),
(7, 18, 90.00),
(8, 18, 150.00),
(9, 18, 115.00),
(10, 18, 125.00),
(1, 9, 100.00),
(2, 9, 150.00),
(3, 9, 120.00),
(4, 9, 130.00),
(5, 9, 110.00),
(2, 19, 160.00),
(6, 9, 90.00),
(7, 9, 80.00),
(8, 9, 140.00),
(9, 9, 105.00),
(10, 9, 115.00),
(1, 19, 110.00),
(2, 19, 160.00),
(3, 19, 130.00),
(4, 19, 140.00),
(5, 19, 120.00),
(6, 19, 100.00),
(7, 19, 90.00),
(8, 19, 150.00),
(9, 19, 115.00),
(10, 19, 125.00),
(1, 10, 100.00),
(2, 10, 150.00),
(3, 10, 120.00),
(4, 10, 130.00),
(5, 10, 110.00),
(6, 10, 90.00),
(7, 10, 80.00),
(8, 10, 140.00),
(9, 10, 105.00),
(10, 10, 115.00),
(1, 20, 110.00),
(2, 20, 160.00),
(3, 20, 130.00),
(4, 20, 140.00),
(5, 20, 120.00),
(6, 20, 100.00),
(7, 20, 90.00),
(8, 20, 150.00),
(9, 20, 115.00),
(10, 20, 125.00);