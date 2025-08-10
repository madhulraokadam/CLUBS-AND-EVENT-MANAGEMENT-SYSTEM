use clubandevents;

select * from membership;

INSERT INTO clubs (club_name, Club_description, Member_count)
VALUES
    ('DATA SCIENCE CLUB', 'Learn and apply data science techniques', 135),
    ('SPORTS CLUB', 'Organizes sports events and competitions', 200),
    ('CULTURAL CLUB', 'Promotes cultural activities and performances', 160),
    ('NCC CLUB', 'National Cadet Corps training and activities', 120),
    ('ROBOTICS CLUB', 'Build robots and compete in challenges', 140),
    ('FASHION CLUB', 'Fashion shows and design workshops', 110);
    
select * from students;
select * from users;
select * from clubs; 

DELETE FROM users
WHERE user_id NOT IN (1, 2);    

ALTER TABLE users AUTO_INCREMENT = 3;

INSERT INTO events (Event_name, Club_id, Date, Time, Venue, Description)
VALUES 
    ('Hackathon 2025', 1, '2025-03-15', '09:00:00', 'Tech Innovation Center', 'coding marathon'),
    ('Marathon 2025', 4, '2025-04-22', '07:00:00', 'City Central Park', 'fundraising run'),
    ('Cultural Fest', 3, '2025-05-18', '10:00:00', 'University Auditorium', 'dance music');
    
desc participation;

alter table participation drop column status;

-- to show student name and which event they are registered in
SELECT 
    s.Student_id,
    s.Name AS student_name,
    s.Email,
    s.Department,
    s.Semester,
    e.Event_name
FROM 
    Students s
JOIN 
    Participation p ON s.Student_id = p.Student_id
JOIN 
    Events e ON p.Event_id = e.Event_id;
 
-- to see which club they are in

SELECT 
    s.Student_id,
    s.Name AS student_name,
    s.Email,
    s.Department,
    s.Semester,
    c.club_name,
    m.Role,
    m.Join_date
FROM 
    Students s
JOIN 
    Membership m ON s.Student_id = m.Student_id
JOIN 
    Clubs c ON m.Club_id = c.Club_id;


desc membership;
select * from users;

INSERT INTO Students (Student_id, User_id, Name, Email, Phone_no, Department, Semester) VALUES
(102, 13, 'Madhu Kadam', 'madhu@cmru.ac.in', '8765432109', 'AIML', 3),
(103, 3, 'Jyothsna', 'jyothsna@cmru.ac.in', '7654321098', 'DS', 5),
(104, 4, 'Nitish', 'nitish@cmru.ac.in', '6543210987', 'IT', 2),
(105, 5, 'Kireeti Reddy', 'kireeti@cmru.ac.in', '9432109876', 'ECE', 6),
(106, 6, 'Kunal Tiwari', 'kunal@cmru.ac.in', '8321098765', 'CSE', 3),
(107, 7, 'Abhiram', 'abhiram@cmru.ac.in', '7210987654', 'AIML', 1),
(108, 8, 'Samarthya', 'samarthya@cmru.ac.in', '6109876543', 'DS', 7),
(109, 9, 'Rohit Mehta', 'rohit@cmru.ac.in', '5098765432', 'IT', 4),
(110, 10, 'Priya Singh', 'priya@cmru.ac.in', '4987654321', 'ECE', 5),
(111, 11, 'Sophia Khan', 'sophia@cmru.ac.in', '3876543210', 'CSE', 2),
(112, 12, 'Megha Kapoor', 'megha@cmru.ac.in', '2765432109', 'AIML', 8);


INSERT INTO Users (user_id, username, email, password_hash) VALUES
(13, 'madhu_k', 'madhu@cmru.ac.in', '$2a$12$abc456...'),
(3, 'jyothsna', 'jyothsna@cmru.ac.in', '$2a$12$def789...'),
(4, 'nitish', 'nitish@cmru.ac.in', '$2a$12$ghi012...'),
(5, 'kireeti_r', 'kireeti@cmru.ac.in', '$2a$12$jkl345...'),
(6, 'kunal_t', 'kunal@cmru.ac.in', '$2a$12$mno678...'),
(7, 'abhiram', 'abhiram@cmru.ac.in', '$2a$12$pqr901...'),
(8, 'samarthya', 'samarthya@cmru.ac.in', '$2a$12$stu234...'),
(9, 'rohit_m', 'rohit@cmru.ac.in', '$2a$12$vwx567...'),
(10, 'priya_s', 'priya@cmru.ac.in', '$2a$12$yza890...'),
(11, 'sophia_k', 'sophia@cmru.ac.in', '$2a$12$bcd123...'),
(12, 'megha_k', 'megha@cmru.ac.in', '$2a$12$efg456...');



INSERT INTO Membership (Membership_id, Student_id, Club_id, Role, Join_date) VALUES
-- Data Science Club (Club_id=1)
(16, 101, 1, 'Member', '2023-01-15'), -- Sanjita as Leader
(2, 102, 1, 'Member', '2023-02-20'), -- Madhu
(3, 103, 1, 'Member', '2023-03-10'), -- Jyothsna

-- Robotics Club (Club_id=5)
(4, 104, 5, 'Member', '2023-01-10'), -- Nitish
(5, 105, 5, 'Member', '2023-02-05'), -- Kireeti

-- Cultural Club (Club_id=3)
(15, 106, 3, 'Member', '2023-03-01'), -- Kunal
(14, 107, 3, 'Member', '2023-04-12'), -- Abhiram

-- Sports Club (Club_id=2)
(13, 108, 2, 'Member', '2023-01-25'), -- Samarthya
(9, 109, 2, 'Member', '2023-03-15'), -- Rohit

-- NCC (Club_id=4)
(10, 110, 4, 'Member', '2023-02-18'), -- Priya
(11, 111, 4, 'Member', '2023-04-05'), -- Sophia
(12, 112, 4, 'Member', '2023-05-20'); -- Megha


delete from clubs where club_id =12;
select * from participation;


SELECT s.Name, s.Email, c.club_name, m.Role, m.Join_date
FROM Students s
JOIN Membership m ON s.Student_id = m.Student_id
JOIN Clubs c ON m.Club_id = c.Club_id;


SELECT s.Name, s.Email, e.event_name
FROM Students s
JOIN Participation p ON s.Student_id = p.Student_id
JOIN Events e ON p.Event_id = e.Event_id;

SELECT e.event_name, COUNT(p.Student_id) AS total_participants
FROM Participation p
JOIN Events e ON p.Event_id = e.Event_id
GROUP BY e.event_name;

DELIMITER $$
CREATE PROCEDURE EnrollInEvent(IN s_id INT, IN e_id INT)
BEGIN
    IF NOT EXISTS (
        SELECT * FROM Participation WHERE Student_id = s_id AND Event_id = e_id
    ) THEN
        INSERT INTO Participation (Student_id, Event_id) VALUES (s_id, e_id);
    END IF;
END $$
DELIMITER ;

CALL EnrollInEvent(104, 3);
select * from participation;

