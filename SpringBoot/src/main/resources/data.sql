delete from users;
delete from state;
delete from streat;
delete from country;

INSERT INTO state (id,name) VALUES (1,'Punjab');
INSERT INTO state (id,name) VALUES (2,'Sindh');
INSERT INTO streat (id,name) VALUES (1,'abc1');
INSERT INTO streat (id,name) VALUES (2,'ghq1');
INSERT INTO country (id,name) VALUES (1,'Pakistan');
INSERT INTO country (id,name) VALUES (2,'India');
	
INSERT INTO users (id, email, username, phone,password, state_id, streat_id, country_id)
VALUES (1,'admin@gmail.com','Admin', 03457610783, '$2a$10$RasCVvXGPZDsktQmxybD1en1WOpb9DIHx/o30s3GPkhkTU4cn5Gte', 1, 1, 1);