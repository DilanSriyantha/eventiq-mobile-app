CREATE TABLE IF NOT EXISTS users (
    id INTEGER AUTO_INCREMENT NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('ADMIN', 'CONSUMER', 'PROVIDER') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT pk_user_id PRIMARY KEY (id),
    CONSTRAINT uc_user_email UNIQUE (email)
)^;

CREATE TABLE IF NOT EXISTS posts (
    id INTEGER AUTO_INCREMENT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    tags VARCHAR(255) NOT NULL,
    imageUrl VARCHAR(255) NOT NULL,
    rate FLOAT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT pk_post_id PRIMARY KEY (id)
)^;

CREATE TABLE IF NOT EXISTS provider_posts (
    provider_id INTEGER NOT NULL,
    post_id INTEGER NOT NULL,

    CONSTRAINT pk_provider_post
    PRIMARY KEY (provider_id, post_id),

    CONSTRAINT fk_provider_posts_provider_id
    FOREIGN KEY (provider_id)
    REFERENCES users(id)
    ON DELETE CASCADE,

    CONSTRAINT fk_post_id
    FOREIGN KEY (post_id)
    REFERENCES posts(id)
    ON DELETE CASCADE
)^;

CREATE TABLE IF NOT EXISTS events (
    id INTEGER AUTO_INCREMENT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description VARCHAR (255) NOT NULL,
    eventDate DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT pk_event_id PRIMARY KEY (id)
)^;

CREATE TABLE IF NOT EXISTS user_events (
    user_id INTEGER NOT NULL,
    event_id INTEGER NOT NULL,

    CONSTRAINT pk_user_event
    PRIMARY KEY (user_id, event_id),

    CONSTRAINT fk_user_events_user_id
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE,

    CONSTRAINT fk_event_id
    FOREIGN KEY (event_id)
    REFERENCES events(id)
    ON DELETE CASCADE
)^;

CREATE TABLE IF NOT EXISTS services (
    id INTEGER AUTO_INCREMENT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    imageUrl VARCHAR(255) NOT NULL,
    rate FLOAT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT pk_service_id PRIMARY KEY (id)
)^;

CREATE TABLE IF NOT EXISTS provider_services (
    provider_id INTEGER NOT NULL,
    service_id INTEGER NOT NULL,

    CONSTRAINT pk_provider_services
    PRIMARY KEY (provider_id, service_id),

    CONSTRAINT fk_provider_services_provider_id
    FOREIGN KEY (provider_id)
    REFERENCES users(id)
    ON DELETE CASCADE,

    CONSTRAINT fk_provider_services_service_id
    FOREIGN KEY (service_id)
    REFERENCES services(id)
    ON DELETE CASCADE
)^;

CREATE TABLE IF NOT EXISTS event_services (
    event_id INTEGER NOT NULL,
    service_id INTEGER NOT NULL,

    CONSTRAINT pk_event_service
    PRIMARY KEY (event_id, service_id),

    CONSTRAINT fk_event_services_event_id
    FOREIGN KEY (event_id)
    REFERENCES events(id)
    ON DELETE CASCADE,

    CONSTRAINT fk_service_id
    FOREIGN KEY (service_id)
    REFERENCES services(id)
    ON DELETE CASCADE
)^;

CREATE TABLE IF NOT EXISTS comments (
    id INTEGER AUTO_INCREMENT NOT NULL,
    comment VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT pk_comment_id PRIMARY KEY (id)
)^;

CREATE TABLE IF NOT EXISTS service_comments (
    service_id INTEGER NOT NULL,
    comment_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,

    CONSTRAINT pk_service_comment
    PRIMARY KEY (service_id, comment_id, user_id),

    CONSTRAINT fk_service_comments_service_id
    FOREIGN KEY (service_id)
    REFERENCES services(id)
    ON DELETE CASCADE,

    CONSTRAINT fk_service_comments_comment_id
    FOREIGN KEY (comment_id)
    REFERENCES comments(id)
    ON DELETE CASCADE,

    CONSTRAINT fk_service_comments_user_id
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
)^;

-- create procedures

-- ProviderPosts procedures

DROP PROCEDURE IF EXISTS GetProviderPosts^;
CREATE PROCEDURE GetProviderPosts()
BEGIN
    SELECT
        u.id AS providerId,
        u.name AS providerName,
        p.id AS postId,
        p.title,
        p.description,
        p.tags,
        p.imageUrl,
        p.rate,
        p.created_at,
        p.updated_at
    FROM provider_posts pp
    JOIN users u ON pp.provider_id = u.id
    JOIN posts p ON pp.post_id = p.id;
END^;

DROP PROCEDURE IF EXISTS GetProviderPostsPage^;
CREATE PROCEDURE GetProviderPostsPage(IN p_limit INT, IN p_offset INT)
BEGIN
    SELECT
        u.id AS providerId,
        u.name AS providerName,
        p.id AS postId,
        p.title,
        p.description,
        p.tags,
        p.imageUrl,
        p.rate,
        p.created_at,
        p.updated_at
    FROM provider_posts pp
    JOIN users u ON pp.provider_id = u.id
    JOIN posts p ON pp.post_id = p.id
    LIMIT p_limit OFFSET p_offset;
END^;

DROP PROCEDURE IF EXISTS GetProviderPostsSearchResultsPage^;
CREATE PROCEDURE GetProviderPostsSearchResultsPage(
    IN p_limit INT,
    IN p_offset INT,
    IN p_search_key VARCHAR(255)
)
BEGIN
    SELECT
        u.id AS providerId,
        u.name AS providerName,
        p.id AS postId,
        p.title,
        p.description,
        p.tags,
        p.imageUrl,
        p.rate,
        p.created_at,
        p.updated_at
    FROM provider_posts pp
    JOIN users u ON pp.provider_id = u.id
    JOIN posts p ON pp.post_id = p.id
    WHERE p.title LIKE CONCAT('%', p_search_key, '%') OR p.tags LIKE CONCAT('%', p_search_key, '%')
    LIMIT p_limit OFFSET p_offset;
END^;

DROP PROCEDURE IF EXISTS GetProviderPost^;
CREATE PROCEDURE GetProviderPost(IN p_id INT)
BEGIN
    SELECT
        u.id AS providerId,
        u.name AS providerName,
        p.id AS postId,
        p.title,
        p.description,
        p.tags,
        p.imageUrl,
        p.rate,
        p.created_at,
        p.updated_at
    FROM (SELECT * FROM provider_posts WHERE post_id = p_id) pp
    JOIN users u ON pp.provider_id = u.id
    JOIN posts p ON pp.post_id = p.id;
END^;

DROP PROCEDURE IF EXISTS GetProviderPostsCount^;
CREATE PROCEDURE GetProviderPostsCount()
BEGIN
    SELECT
        COUNT(*)
    FROM provider_posts pp;
END^;

DROP PROCEDURE IF EXISTS GetProviderPostsSearchResultsCount^;
CREATE PROCEDURE GetProviderPostsSearchResultsCount(
    IN p_search_key VARCHAR(255)
)
BEGIN
    SELECT
        COUNT(*)
    FROM provider_posts pp
    JOIN users u ON pp.provider_id = u.id
    JOIN posts p ON pp.post_id = p.id
    WHERE p.title LIKE CONCAT('%', p_search_key, '%') OR p.tags LIKE CONCAT('%', p_search_key, '%');
END^;

DROP PROCEDURE IF EXISTS CreateProviderPost^;
CREATE PROCEDURE CreateProviderPost(
    IN p_provider_id INT,
    IN p_title VARCHAR(255),
    IN p_description VARCHAR(255),
    IN p_tags VARCHAR(255),
    IN p_imageUrl VARCHAR(255)
)
BEGIN
    DECLARE new_post_id INT;

    INSERT INTO posts (title, description, tags, imageUrl, rate)
    VALUES (p_title, p_description, p_tags, p_imageUrl, 0);

    SET new_post_id = LAST_INSERT_ID();

    INSERT INTO provider_posts (provider_id, post_id)
    VALUES (p_provider_id, new_post_id);
END^;

DROP PROCEDURE IF EXISTS UpdateProviderPost^;
CREATE PROCEDURE UpdateProviderPost(
    IN p_id INT,
    IN p_title VARCHAR(255),
    IN p_description VARCHAR(255),
    IN p_tags VARCHAR(255),
    IN p_imageUrl VARCHAR(255),
    IN p_rate FLOAT
)
BEGIN
    UPDATE posts SET
        title = p_title,
        description = p_description,
        tags = p_tags,
        imageUrl = p_imageUrl
    WHERE id = p_id;
END^;

DROP PROCEDURE IF EXISTS DeleteProviderPost^;
CREATE PROCEDURE DeleteProviderPost(
    IN p_id INT
)
BEGIN
    DELETE FROM provider_posts WHERE post_id = p_id;

    DELETE FROM posts WHERE id = p_id;
END^;

-- ConsumerEvents procedures

DROP PROCEDURE IF EXISTS GetConsumerEvents^;
CREATE PROCEDURE GetConsumerEvents(
    IN p_user_id INT
)
BEGIN
    SELECT
        u.id AS userId,
        u.name AS userName,
        e.id,
        e.title,
        e.description,
        e.eventDate AS date,
        e.created_at,
        e.updated_at
    FROM user_events ue
    JOIN users u ON ue.user_id = u.id
    JOIN events e ON ue.event_id = e.id
    WHERE u.id = p_user_id;
END^;

DROP PROCEDURE IF EXISTS GetConsumerEventsPage^;
CREATE PROCEDURE GetConsumerEventsPage(
    IN p_user_id INT,
    IN p_limit INT,
    IN p_offset INT
)
BEGIN
    SELECT
        u.id AS userId,
        u.name AS userName,
        e.id,
        e.title,
        e.description,
        e.eventDate AS date,
        e.created_at,
        e.updated_at
    FROM user_events ue
    JOIN users u ON ue.user_id = u.id
    JOIN events e ON ue.event_id = e.id
    WHERE u.id = p_user_id
    LIMIT p_limit OFFSET p_offset;
END^;

DROP PROCEDURE IF EXISTS GetConsumerEventsCount^;
CREATE PROCEDURE GetConsumerEventsCount(
    IN p_user_id INT
)
BEGIN
    SELECT
        COUNT(*)
    FROM user_events ue
    JOIN users u ON ue.user_id = u.id
    JOIN events e ON ue.event_id = e.id
    WHERE u.id = p_user_id;
END^;

DROP PROCEDURE IF EXISTS GetConsumerEvent^;
CREATE PROCEDURE GetConsumerEvent (
    IN p_event_id INT
)
BEGIN
    SELECT
        u.id AS userId,
        u.name AS userName,
        e.id,
        e.title,
        e.description,
        e.eventDate AS date,
        e.created_at,
        e.updated_at
    FROM (SELECT * FROM user_events WHERE event_id = p_event_id) ue
    JOIN users u ON ue.user_id = u.id
    JOIN events e ON ue.event_id = e.id;
END^;

DROP PROCEDURE IF EXISTS CreateConsumerEvent^;
CREATE PROCEDURE CreateConsumerEvent (
    IN p_user_id INT,
    IN p_title VARCHAR(255),
    IN p_description VARCHAR(255),
    IN p_date DATE
)
BEGIN
    DECLARE last_event_id INT;

    INSERT INTO events (title, description, eventDate) VALUES (p_title, p_description, p_date);
    SET last_event_id = LAST_INSERT_ID();

    INSERT INTO user_events (user_id, event_id) VALUES (p_user_id, last_event_id);
END^;

DROP PROCEDURE IF EXISTS UpdateConsumerEvent^;
CREATE PROCEDURE UpdateConsumerEvent (
    IN p_event_id INT,
    IN p_title VARCHAR(255),
    IN p_description VARCHAR(255),
    IN p_date DATE
)
BEGIN
    UPDATE events SET
        title = p_title,
        description = p_description,
        eventDate = p_date
    WHERE id = p_event_id;
END^;

DROP PROCEDURE IF EXISTS DeleteConsumerEvent^;
CREATE PROCEDURE DeleteConsumerEvent (
    IN p_event_id INT
)
BEGIN
    DELETE FROM events WHERE id = p_event_id;

    DELETE FROM user_events WHERE event_id = p_event_id;
END^;


-- ProviderServices Procedures

DROP PROCEDURE IF EXISTS GetAllProviderServices^;
CREATE PROCEDURE GetAllProviderServices()
BEGIN
    SELECT
        s.id,
        p.id AS providerId,
        p.name AS providerName,
        s.title,
        s.description,
        s.imageUrl,
        s.rate,
        s.created_at,
        s.updated_at
    FROM provider_services ps
    JOIN users p ON ps.provider_id = p.id
    JOIN services s ON ps.service_id = s.id;
END^;

DROP PROCEDURE IF EXISTS GetProviderServicesPage^;
CREATE PROCEDURE GetProviderServicesPage (
    IN p_limit INT,
    IN p_offset INT
)
BEGIN
    SELECT
        s.id,
        p.id AS providerId,
        p.name AS providerName,
        s.title,
        s.description,
        s.imageUrl,
        s.rate,
        s.created_at,
        s.updated_at
    FROM provider_services ps
    JOIN users p ON ps.provider_id = p.id
    JOIN services s ON ps.service_id = s.id
    LIMIT p_limit OFFSET p_offset;
END^;

DROP PROCEDURE IF EXISTS GetProviderServicesPageByProviderId^;
CREATE PROCEDURE GetProviderServicesPageByProviderId(
    IN p_provider_id INT,
    IN p_limit INT,
    IN p_offset INT
)
BEGIN
    SELECT
        s.id,
        p.id AS providerId,
        p.name AS providerName,
        s.title,
        s.description,
        s.imageUrl,
        s.rate,
        s.created_at,
        s.updated_at
    FROM (SELECT * FROM provider_services WHERE provider_id = p_provider_id) ps
    JOIN users p ON ps.provider_id = p.id
    JOIN services s ON ps.service_id = s.id
    LIMIT p_limit OFFSET p_offset;
END^;

DROP PROCEDURE IF EXISTS GetProviderService^;
CREATE PROCEDURE GetProviderService (
    IN p_id INT
)
BEGIN
    SELECT
        s.id,
        p.id AS providerId,
        p.name AS providerName,
        s.title,
        s.description,
        s.imageUrl,
        s.rate,
        s.created_at,
        s.updated_at
    FROM (SELECT * FROM provider_services WHERE service_id = p_id) ps
    JOIN users p ON ps.provider_id = p.id
    JOIN services s ON ps.service_id = s.id;
END^;

DROP PROCEDURE IF EXISTS CreateProviderService^;
CREATE PROCEDURE CreateProviderService (
    IN p_provider_id INT,
    IN p_title VARCHAR(255),
    IN p_description VARCHAR(255),
    IN p_imageUrl VARCHAR(255),
    IN p_rate FLOAT
)
BEGIN
    DECLARE last_service_id INT;

    INSERT INTO services (title, description, imageUrl, rate) VALUES
    (p_title, p_description, p_imageUrl, p_rate);

    SET last_service_id = LAST_INSERT_ID();

    INSERT INTO provider_services (provider_id, service_id) VALUES
    (p_provider_id, last_service_id);
END^;

DROP PROCEDURE IF EXISTS UpdateProviderService^;
CREATE PROCEDURE UpdateProviderService (
    IN p_id INT,
    IN p_title VARCHAR(255),
    IN p_description VARCHAR(255),
    IN p_imageUrl VARCHAR(255),
    IN p_rate FLOAT
)
BEGIN
    UPDATE services SET
        title = p_title,
        description = p_description,
        imageUrl = p_imageUrl,
        rate = p_rate
    WHERE id = p_id;
END^;

DROP PROCEDURE IF EXISTS DeleteProviderService^;
CREATE PROCEDURE DeleteProviderService (
    IN p_id INT
)
BEGIN
    DELETE FROM services WHERE id = p_id;

    DELETE FROM provider_services WHERE service_id = p_id;
END^;

DROP PROCEDURE IF EXISTS GetProviderServicesCount^;
CREATE PROCEDURE GetProviderServicesCount()
BEGIN
    SELECT
        COUNT(*)
    FROM provider_services;
END^;

DROP PROCEDURE IF EXISTS GetProviderServicesCountByProviderId^;
CREATE PROCEDURE GetProviderServicesCountByProviderId(
    IN p_provider_id INT
)
BEGIN
    SELECT
        COUNT(*)
    FROM provider_services
    WHERE provider_id = p_provider_id;
END^;