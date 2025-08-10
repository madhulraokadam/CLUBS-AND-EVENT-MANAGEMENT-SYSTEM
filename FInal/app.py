from flask import Flask, render_template, request, redirect, url_for, session, jsonify
import pymysql
from flask_bcrypt import Bcrypt



app = Flask(__name__)
app.secret_key = "720627"
bcrypt = Bcrypt(app)



# Database Connection
db = pymysql.connect(
    host="localhost",
    user="root",
    password="root",
    database="clubandevents"
)
cursor = db.cursor()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/signup')
def signup():
    return render_template('register.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return render_template('login.html')  # ✅ Render the login page for GET requests
    
    # Handle login form submission
    try:
        if request.content_type != 'application/json':
            return jsonify({"success": False, "message": "Invalid Content-Type. Use application/json."}), 415

        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return jsonify({"success": False, "message": "Email and password are required."}), 400

        cursor.execute("SELECT user_id, password_hash FROM users WHERE email = %s", (email,))
        user = cursor.fetchone()

        if user and bcrypt.check_password_hash(user[1], password):
            session['user_id'] = user[0]
            return jsonify({"success": True, "message": "Login successful", "redirect": url_for('home')})
        else:
            return jsonify({"success": False, "message": "Invalid email or password"}), 401

    except Exception as e:
        print(f"Error in login route: {str(e)}")
        return jsonify({"success": False, "message": "Internal Server Error"}), 500


@app.route('/home')
def home():
    if 'user_id' in session:
        return render_template('home.html')
    return redirect(url_for('login'))

@app.route('/register', methods=['GET'])
def show_register_page():
    return render_template('register.html')


@app.route('/register', methods=['POST'])
def register():
    if request.content_type != 'application/json':
        return jsonify({"success": False, "message": "Invalid Content-Type. Use application/json."}), 415
    if request.method == 'POST':
        data = request.get_json()
        full_name = data['fullName']
        email = data['email']
        password = data['password']
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

        try:
            cursor.execute("INSERT INTO users (username, email, password_hash) VALUES (%s, %s, %s)", 
                        (full_name, email, hashed_password))
            db.commit()
            
            return jsonify({"success": True, "message": "Registration successful"})
        except pymysql.err.IntegrityError:
            return jsonify({"success": False, "message": "Email already exists."})

    return render_template('home.html')




@app.route('/clubs')
def clubs():
    return render_template('clubs.html')



@app.route('/club_register', methods=['POST'])
def club_register():
    try:
        data = request.get_json()
        print("Received data:", data)  # Debugging output

        if not data:
            return jsonify({"success": False, "message": "Invalid request"}), 400

        student_name = data.get('studentName')
        student_email = data.get('studentEmail')
        student_club = data.get('studentClub')
        student_department = data.get('studentDepartment')
        student_phonenumber = data.get('studentPhonenumber')  # fixed key name
        student_semester = data.get('studentSemester')

        # Check for missing fields
        if not all([student_name, student_email, student_club, student_department, student_phonenumber, student_semester]):
            return jsonify({"success": False, "message": "Missing required fields"}), 400

        # Fetch User ID from Users table
        cursor.execute("SELECT user_id FROM Users WHERE email = %s", (student_email,))
        user = cursor.fetchone()

        if not user:
            return jsonify({"success": False, "message": "User not found. Please register first."}), 400

        user_id = user[0]

        # Check if student exists
        cursor.execute("SELECT Student_id FROM Students WHERE Email = %s", (student_email,))
        existing_student = cursor.fetchone()

        if existing_student:
            student_id = existing_student[0]
        else:
            cursor.execute("""
                INSERT INTO Students (User_id, Name, Email, Department, Phone_no, Semester) 
                VALUES (%s, %s, %s, %s, %s, %s)
            """, (user_id, student_name, student_email, student_department, student_phonenumber, student_semester))
            student_id = cursor.lastrowid

        # Get club ID
        cursor.execute("SELECT Club_id FROM Clubs WHERE club_name = %s", (student_club,))
        club = cursor.fetchone()

        if not club:
            return jsonify({"success": False, "message": "Club not found."}), 400

        club_id = club[0]

        # Insert into membership
        cursor.execute("""
            INSERT INTO Membership (Student_id, Club_id, Role, Join_date) 
            VALUES (%s, %s, %s, NOW())
        """, (student_id, club_id, 'Member'))

        db.commit()

        return jsonify({"success": True, "message": "Successfully registered for the club!"})

    except Exception as e:
        print("Error during registration:", e)
        return jsonify({"success": False, "message": str(e)}), 500


@app.route('/events')
def events():
    return render_template('events.html')

@app.route('/event_register', methods=['POST'])
def event_register():
    try:
        data = request.get_json()

        name = data.get('name')
        email = data.get('email')
        phone = data.get('phone')
        department = data.get('department')
        semester = data.get('semester')
        event_name = data.get('eventName')

        if not all([name, email, phone, department, semester, event_name]):
            return jsonify({"success": False, "message": "Missing data"}), 400

        # ✅ Check if student exists
        cursor.execute("SELECT Student_id FROM Students WHERE Email = %s", (email,))
        student = cursor.fetchone()

        if student:
            student_id = student[0]
        else:
            # ✅ Insert new student
            cursor.execute("""
                INSERT INTO Students (Name, Email, Phone_no, Department, Semester)
                VALUES (%s, %s, %s, %s, %s)
            """, (name, email, phone, department, semester))
            db.commit()
            student_id = cursor.lastrowid

        # ✅ Get Event ID
        cursor.execute("SELECT Event_id FROM Events WHERE event_name = %s", (event_name,))
        event = cursor.fetchone()

        if not event:
            return jsonify({"success": False, "message": "Event not found"}), 400

        event_id = event[0]

        # ✅ Prevent duplicate registrations
        cursor.execute("SELECT * FROM Participation WHERE Student_id = %s AND Event_id = %s", (student_id, event_id))
        if cursor.fetchone():
            return jsonify({"success": False, "message": "You are already registered for this event."}), 400

        # ✅ Register participation
        cursor.execute("INSERT INTO Participation (Student_id, Event_id) VALUES (%s, %s)", (student_id, event_id))
        db.commit()

        return jsonify({"success": True, "message": "Successfully registered for the event!"})

    except Exception as e:
        print("Error in event_register:", e)
        return jsonify({"success": False, "message": "Internal server error"}), 500


@app.route('/notifications')
def notifications():
    return render_template('notifications.html')


@app.route('/profile')
def profile():
    return render_template('profile.html')


@app.route('/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({"success": True, "message": "Logged out successfully"}), 200


if __name__ == '__main__':
    app.run(debug=True)
