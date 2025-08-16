-- Clear existing data in correct dependency order
SET FOREIGN_KEY_CHECKS = 0^;

TRUNCATE TABLE event_comments^;
TRUNCATE TABLE comments^;
TRUNCATE TABLE event_services^;
TRUNCATE TABLE services^;
TRUNCATE TABLE user_events^;
TRUNCATE TABLE events^;
TRUNCATE TABLE provider_posts^;
TRUNCATE TABLE posts^;
TRUNCATE TABLE users^;

SET FOREIGN_KEY_CHECKS = 1^;

-- Insert Users
INSERT IGNORE INTO users (name, email, password, role) VALUES
('Admin User', 'admin@example.com', '$2a$10$KJBMKHnjZ8g365/oopFiuupcGruZx2XKW60xEMzI7lzCDJ/4TJvTq', 'CONSUMER'),
('John Doe', 'john@example.com', '$2a$10$KJBMKHnjZ8g365/oopFiuupcGruZx2XKW60xEMzI7lzCDJ/4TJvTq', 'PROVIDER'),
('Jane Smith', 'jane@example.com', '$2a$10$KJBMKHnjZ8g365/oopFiuupcGruZx2XKW60xEMzI7lzCDJ/4TJvTq', 'CONSUMER'),
('Mike Johnson', 'mike@example.com', '$2a$10$KJBMKHnjZ8g365/oopFiuupcGruZx2XKW60xEMzI7lzCDJ/4TJvTq', 'PROVIDER'),
('Dilan Sriyantha', 'dilans091@gmail.com', '$2a$10$KJBMKHnjZ8g365/oopFiuupcGruZx2XKW60xEMzI7lzCDJ/4TJvTq', 'ADMIN')^;

-- Insert Posts
INSERT INTO posts (title, description, tags, imageUrl, rate) VALUES
('Wedding Photography', 'Professional wedding photography services', 'wedding,photography', 'images/wedding.jpg', 4.8),
('Catering Service', 'Delicious catering for all events', 'catering,food', 'images/catering.jpg', 4.5),
('Event DJ', 'Experienced DJ for parties and events', 'dj,music', 'images/dj.jpg', 4.7)^;

-- Link Providers to Posts
INSERT INTO provider_posts (provider_id, post_id) VALUES
(2, 1),
(4, 2),
(4, 3)^;

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
('Full Catering', 'Complete catering package for events', 'images/full_catering.jpg', 1500.00),
('Stage Lighting', 'Professional lighting setup', 'images/lighting.jpg', 500.00),
('Sound System', 'High-quality sound system rental', 'images/sound.jpg', 800.00)^;

-- Link Events to Services
INSERT INTO event_services (event_id, service_id) VALUES
(1, 1),  -- Summer Festival -> Full Catering
(1, 2),  -- Summer Festival -> Stage Lighting
(2, 3)^;  -- Corporate Gala -> Sound System

-- Insert Comments
INSERT INTO comments (comment) VALUES
('Great event, had a wonderful time!'),
('Food was amazing and staff were friendly.'),
('Music was fantastic!')^;

-- Link Events to Comments
INSERT INTO event_comments (event_id, comment_id, user_id) VALUES
(1, 1, 1),  -- Summer Festival -> Great event
(1, 3, 2),  -- Summer Festival -> Music was fantastic
(2, 2, 3)^;  -- Corporate Gala -> Food was amazing
