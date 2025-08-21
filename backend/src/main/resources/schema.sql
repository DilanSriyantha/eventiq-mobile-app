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

CREATE TABLE IF NOT EXISTS provider_info (
    id INTEGER AUTO_INCREMENT NOT NULL,
    title VARCHAR(255) NOT NULL,
    welcome_note VARCHAR(255) NOT NULL,
    tags VARCHAR(255) NOT NULL,
    rating FLOAT DEFAULT 0.0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT pk_provider_info
    PRIMARY KEY (id)
)^;

CREATE TABLE IF NOT EXISTS provider_provider_info (
    provider_id INTEGER NOT NULL,
    info_id INTEGER NOT NULL,

    CONSTRAINT pk_provider_provider_info
    PRIMARY KEY (provider_id, info_id),

    CONSTRAINT fk_provider_provider_info_provider_id
    FOREIGN KEY (provider_id)
    REFERENCES users(id)
    ON DELETE CASCADE,

    CONSTRAINT fk_provider_provider_info_info_id
    FOREIGN KEY (info_id)
    REFERENCES provider_info(id)
    ON DELETE CASCADE
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

-- Users procedures

DROP PROCEDURE IF EXISTS GetAllUsers^;
CREATE PROCEDURE GetAllUsers ()
BEGIN
    SELECT *
    FROM users;
END^;

DROP PROCEDURE IF EXISTS GetUserById^;
CREATE PROCEDURE GetUserById (
    IN p_id INT
)
BEGIN
    SELECT *
    FROM users WHERE id = p_id;
END^;

DROP PROCEDURE IF EXISTS GetUserByEmail^;
CREATE PROCEDURE GetUserByEmail (
    IN p_email VARCHAR(255)
)
BEGIN
    SELECT *
    FROM users WHERE email = p_email;
END^;

DROP PROCEDURE IF EXISTS GetUsersPage^;
CREATE PROCEDURE GetUsersPage (
    IN p_limit INT,
    IN p_offset INT
)
BEGIN
    SELECT *
    FROM users
    ORDER BY id ASC
    LIMIT p_limit OFFSET p_offset;
END^;

DROP PROCEDURE IF EXISTS GetUsersCount^;
CREATE PROCEDURE GetUsersCount ()
BEGIN
    SELECT COUNT(*)
    FROM users;
END^;

DROP PROCEDURE IF EXISTS CreateUser^;
CREATE PROCEDURE CreateUser (
    IN p_name VARCHAR(255),
    IN p_email VARCHAR(255),
    IN p_password VARCHAR(255),
    IN p_role VARCHAR(50)
)
BEGIN
    DECLARE last_user_id INT;
    DECLARE last_info_id INT;

    CASE
        WHEN p_role = 'PROVIDER' THEN
            INSERT INTO users (name, email, password, role) VALUES
            (p_name, p_email, p_password, p_role);

            SET last_user_id = LAST_INSERT_ID();

            INSERT INTO provider_info (title, welcome_note, tags) VALUES (
                CONCAT(p_name, '\'s business'),
                CONCAT('Welcome to ', p_name, '\'s business'),
                ''
            );

            SET last_info_id = LAST_INSERT_ID();

            INSERT INTO provider_provider_info (provider_id, info_id) VALUES
            (last_user_id, last_info_id);
        ELSE
            INSERT INTO users (name, email, password, role) VALUES
            (p_name, p_email, p_password, p_role);
    END CASE;
END^;

DROP PROCEDURE IF EXISTS UpdateUser^;
CREATE PROCEDURE UpdateUser (
    IN p_id INT,
    IN p_name VARCHAR(255),
    IN p_email VARCHAR(255),
    IN p_password VARCHAR(255),
    IN p_role VARCHAR(50)
)
BEGIN
    UPDATE users SET
        name = p_name,
        email = p_email,
        password = p_password,
        role = p_role
    WHERE id = p_id;
END^;

DROP PROCEDURE IF EXISTS DeleteUser^;
CREATE PROCEDURE DeleteUser (
    IN p_id INT
)
BEGIN
    DELETE FROM users WHERE id = p_id;
END^;

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


--Provider Procedures

DROP PROCEDURE IF EXISTS GetAllServiceProviders^;
CREATE PROCEDURE GetAllServiceProviders()
BEGIN
    SELECT
        i.id,
        u.id AS providerId,
        u.name AS providerName,
        i.title,
        i.welcome_note,
        i.tags,
        i.rating,
        i.created_at,
        i.updated_at
    FROM provider_provider_info ppi
    JOIN users u ON ppi.provider_id = u.id
    JOIN provider_info i ON ppi.info_id = i.id;
END^;

DROP PROCEDURE IF EXISTS GetServiceProvidersPage^;
CREATE PROCEDURE GetServiceProvidersPage(
    IN p_limit INT,
    IN p_offset INT
)
BEGIN
    SELECT
        i.id,
        u.id AS providerId,
        u.name AS providerName,
        i.title,
        i.welcome_note,
        i.tags,
        i.rating,
        i.created_at,
        i.updated_at
    FROM provider_provider_info ppi
    JOIN users u ON ppi.provider_id = u.id
    JOIN provider_info i ON ppi.info_id = i.id
    LIMIT p_limit OFFSET p_offset;
END^;

DROP PROCEDURE IF EXISTS GetServiceProviderByInfoId^;
CREATE PROCEDURE GetServiceProviderByInfoId (
    IN p_info_id INT
)
BEGIN
    SELECT
        i.id,
        u.id AS providerId,
        u.name AS providerName,
        i.title,
        i.welcome_note,
        i.tags,
        i.rating,
        i.created_at,
        i.updated_at
    FROM (SELECT * FROM provider_provider_info WHERE info_id = p_info_id) ppi
    JOIN users u ON ppi.provider_id = u.id
    JOIN provider_info i ON ppi.info_id = i.id;
END^;

DROP PROCEDURE IF EXISTS GetServiceProviderByProviderId^;
CREATE PROCEDURE GetServiceProviderByProviderId (
    IN p_provider_id INT
)
BEGIN
    SELECT
        i.id,
        u.id AS providerId,
        u.name AS providerName,
        i.title,
        i.welcome_note,
        i.tags,
        i.rating,
        i.created_at,
        i.updated_at
    FROM (SELECT * FROM provider_provider_info WHERE provider_id = p_provider_id) ppi
    JOIN users u ON ppi.provider_id = u.id
    JOIN provider_info i ON ppi.info_id = i.id;
END^;

DROP PROCEDURE IF EXISTS CreateServiceProvider^;
CREATE PROCEDURE CreateServiceProvider (
    IN p_provider_id INT,
    IN p_title VARCHAR(255),
    IN p_welcome_note VARCHAR(255),
    IN p_tags VARCHAR(255)
)
BEGIN
    DECLARE last_info_id INT;

    INSERT INTO provider_info (title, welcome_note, tags) VALUES
    (p_title, p_welcome_note, p_tags);

    SET last_info_id = LAST_INSERT_ID();

    INSERT INTO provider_provider_info (provider_id, info_id) VALUES
    (p_provider_id, last_info_id);
END^;

DROP PROCEDURE IF EXISTS UpdateServiceProvider^;
CREATE PROCEDURE UpdateServiceProvider (
    IN p_info_id INT,
    IN p_title VARCHAR(255),
    IN p_welcome_note VARCHAR(255),
    IN p_tags VARCHAR(255)
)
BEGIN
    UPDATE provider_info SET
        title = p_title,
        welcome_note = p_welcome_note,
        tags = p_tags
    WHERE id = p_info_id;
END^;

DROP PROCEDURE IF EXISTS DeleteServiceProvider^;
CREATE PROCEDURE DeleteServiceProvider (
    IN p_info_id INT
)
BEGIN
    DELETE FROM provider_info WHERE id = p_info_id;

    DELETE FROM provider_provider_info WHERE info_id = p_info_id;
END^;

DROP PROCEDURE IF EXISTS GetServiceProvidersCount^;
CREATE PROCEDURE GetServiceProvidersCount ()
BEGIN
    SELECT
        COUNT(*)
    FROM provider_provider_info;
END^;