-- Clear existing data in correct dependency order
SET FOREIGN_KEY_CHECKS = 0^;

TRUNCATE TABLE provider_info^;
TRUNCATE TABLE provider_provider_info^;
TRUNCATE TABLE comments^;
TRUNCATE TABLE event_services^;
TRUNCATE TABLE services^;
TRUNCATE TABLE provider_services^;
TRUNCATE TABLE service_comments^;
TRUNCATE TABLE user_events^;
TRUNCATE TABLE events^;
TRUNCATE TABLE provider_posts^;
TRUNCATE TABLE posts^;
TRUNCATE TABLE users^;

SET FOREIGN_KEY_CHECKS = 1^;

-- Insert Users
INSERT IGNORE INTO users (name, email, password, role) VALUES
('Dilan Sriyantha', 'dilans091@gmail.com', '$2a$10$KJBMKHnjZ8g365/oopFiuupcGruZx2XKW60xEMzI7lzCDJ/4TJvTq', 'ADMIN'),
('John Doe', 'john@example.com', '$2a$10$KJBMKHnjZ8g365/oopFiuupcGruZx2XKW60xEMzI7lzCDJ/4TJvTq', 'CONSUMER'),
('Jane Smith', 'jane@example.com', '$2a$10$KJBMKHnjZ8g365/oopFiuupcGruZx2XKW60xEMzI7lzCDJ/4TJvTq', 'CONSUMER'),
('James Artigala', 'studioartigala@example.com', '$2a$10$KJBMKHnjZ8g365/oopFiuupcGruZx2XKW60xEMzI7lzCDJ/4TJvTq', 'PROVIDER'),
('Jack Marston', 'tastycaters@example.com', '$2a$10$KJBMKHnjZ8g365/oopFiuupcGruZx2XKW60xEMzI7lzCDJ/4TJvTq', 'PROVIDER'),
('McCallum Runner', 'mcrunner@example.com', '$2a$10$KJBMKHnjZ8g365/oopFiuupcGruZx2XKW60xEMzI7lzCDJ/4TJvTq', 'PROVIDER')^;

-- Insert Posts
INSERT INTO posts (title, description, tags, imageUrl, rate) VALUES
('Photography', 'Professional photography services', 'wedding,photography', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3CQKsrGzxxhe51hBTUoWMqtqNFnIBmChwZA&s', 4.8),
('Catering Service', 'Delicious catering for all events', 'catering,food', 'https://www.steamboat.lk/images/site-specific/catering-services/test/new/5-1920x1280px.jpg', 4.5),
('Event DJ', 'Experienced DJ for parties and events', 'dj,music', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8gj-P0i_3EaifrFtmGgB5l48bJv9KQPAZpw&s', 4.7)^;

-- Link Providers to Posts
INSERT INTO provider_posts (provider_id, post_id) VALUES
(4, 1),
(5, 2),
(6, 3)^;

-- Insert Events
INSERT INTO events (title, description, eventDate) VALUES
('Summer Festival', 'Annual community summer festival', '2025-07-15'),
('Corporate Gala', 'Formal gala dinner for corporate clients', '2025-09-10')^;

-- Link Users to Events
INSERT INTO user_events (user_id, event_id) VALUES
(3, 1),  -- Jane attending Summer Festival
(2, 2),  -- John attending Corporate Gala
(4, 1)^;  -- Mike attending Summer Festival

-- Insert Services
INSERT INTO services (title, description, imageUrl, rate) VALUES
('Wedding Photography', 'Complete wedding photography package', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3CQKsrGzxxhe51hBTUoWMqtqNFnIBmChwZA&s', 4.2),
('Catering Package Light', 'Minimal catering package', 'https://www.steamboat.lk/images/site-specific/catering-services/test/new/5-1920x1280px.jpg', 4.0),
('Daytime DJ', 'High-quality DJ experience during daytime 4hrs', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8gj-P0i_3EaifrFtmGgB5l48bJv9KQPAZpw&s', 3.7)^;

INSERT INTO provider_services (provider_id, service_id) VALUES
(4, 1),
(5, 2),
(6, 3)^;

-- Link Events to Services
INSERT INTO event_services (event_id, service_id) VALUES
(1, 1),
(1, 2),
(2, 1),
(2, 2),
(2, 3)^;

-- Insert Comments
INSERT INTO comments (comment) VALUES
('Very professional and flexible service, had a wonderful album end of the day!'),
('Very good food they offer.'),
('Really good sound system and talented DJ. We enjoyed having them at our event.')^;

INSERT INTO service_comments (service_id, comment_id, user_id) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 3)^;

INSERT INTO provider_info (title, welcome_note, tags, rating) VALUES
("Artigala Studio", "Lorem ipsum lorem ipsum", "wedding, photography, party, album", 4.0),
("Tasty Caters", "Lorem ipsum lorem ipsum", "catering, food, event-catering", 4.2),
("DJ Runner", "Lorem ipsum lorem ipsum", "party, dance, dj, music", 3.7)^;

INSERT INTO provider_provider_info (provider_id, info_id) VALUES
(4, 1),
(5, 2),
(6, 3)^;