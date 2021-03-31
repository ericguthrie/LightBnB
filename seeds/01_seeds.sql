INSERT INTO reservations (guest_id, property_id, start_date, end_date) 
VALUES (1, 1, '2018-09-11', '2018-09-26'),
(2, 2, '2019-01-04', '2019-02-01'),
(3, 3, '2021-10-01', '2021-10-14');

INSERT INTO users (name, email, password) 
VALUES ('Batman', 'jokersucks@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Robin', 'tiredofbeing#2@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Joker', 'justwantworldtoburn@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');

INSERT INTO properties (owner_id, title, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active) 
VALUES (1, 'Batcave', 'text', 'text', 1699, 11, 11, 12, 'text', 'text', 'text', 'text', 'text'),
(2, 'Guest rm in Batcave',  'text', 'text', 699, 1, 1, 1, 'text', 'text', 'text', 'text', 'text'),
(3, 'house I stole',  'text', 'text', 1299, 2, 3, 3, 'text', 'text', 'text', 'text', 'text');

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message) 
VALUES (1, 3, 1, 3, 'Pretty nice, smells like hair dye tho'),
(2, 1, 2, 5, 'Place is HUGE, kinda creepy tho'),
(3, 2, 3, 4, 'Bit cramped, cozy room tho');