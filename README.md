# 🎓 School CRM System 🎓

Welcome to the *School CRM System* project! This system is designed to provide a smooth and intuitive experience for parents, students, and staff, focusing on student management and engagement. With our CRM, schools can enhance communication, ensure timely updates, and foster a better learning environment.

## 🌟 Key Features

### 👨‍👩‍👦 *Parent Signup and Login*
   - Simple registration process for parents, offering easy access to their child's information and school updates.
   - Secure login with password protection and **email verification** for added security.

### 🧑‍🎓 *Student Profile*
   - A comprehensive student profile displaying personal details, grades, activities, and more.
   - Accessible by both parents and school admins for monitoring and updates.

### 📊 *Dashboard Overview (Default Screen)*
   - **Timetable**: A visually appealing timetable with subject icons for easy navigation.
   - **Notifications**: Important alerts like upcoming events, exams, or school notices are easily accessible with notification icons.
   - **Fee & Attendance Tiles**: Quick-glance tiles display current fee status and attendance records.

### 📅 *Class Diary*
   - **Calendar Interface**: The class diary is displayed in a calendar format.
   - **Diary Entries**: Clicking on a specific date shows the class diary for that day, with information pulled from the backend.
   - **Diary Content**: Displays details of all subjects the student is currently enrolled in.

### 📝 *Mock Tests*
   - **Test List**: Available mock tests are shown in the form of engaging cards.
   - **MCQ Interface**: Multiple-choice questions appear upon selecting a test, with only one attempt per question allowed.
      - **Answer Feedback**: Correct answers are highlighted in green, incorrect ones in red, with explanations for wrong answers.
   - **Test Scores**: After completing the test, scores are displayed, and users can see their progress:
      - *Attended Test*: Shows the score (e.g., 7/10).
      - *Pending Test*: Displays as "Pending" if the test hasn't been taken yet.
   - **Sample Data**: The system comes with 10 dummy questions and answers for testing purposes.

### 📚 *Assignments Tab*
   - **Assignment List**: Students can view their current assignments in a structured list.
   - **Submission**: Supports file uploads (PDF or DOC) for submitting assignments.
   - **Assignment Status**: Shows "Pending" for assignments that are yet to be submitted and "Submitted" for those already uploaded.

### ✅ *Attendance Tab*
   - **Calendar View**: Attendance records are shown in a calendar format. Dates with attendance are circled.
   - **Attendance Status**: Dates show a green circle if attended, red if missed, with public holidays excluded (data fetched from a dummy JSON response).
   - **Summary**: The top right corner displays the total number of attended classes out of the total available (e.g., 22/30).

---

## ⚙️ Technical Details

### 💻 *Frontend*:
   - Prioritizes user experience (UX) with a clean and simple design.
   - Calendar components are used for attendance and class diary views.
   - Dynamic cards are employed for mock tests and assignments, creating an engaging user experience.

### 🛠️ *Backend*:
   - Data is fetched dynamically via JSON for diaries, mock tests, and attendance details.
   - Authentication is handled through secure, token-based APIs.
   - Mock test answers and scores are stored in the backend and retrieved as needed.

### 🔍 *Testing*:
   - Uses dummy JSON data for testing purposes, such as mock test questions and attendance records.
   - Basic validation checks are in place for file uploads and form submissions.

---

## 📥 Installation & Setup

### 1. *Clone the Repository* 
   ```bash
   git clone https://github.com/your-repo/school-crm-system.git
   ```

### 2. *Install Dependencies* 
   Navigate to the project folder and install the necessary packages:
   ```bash
   cd school-crm-system
   npm install
   ```

### 3. *Run the Application* 
   Start the local development server:
   ```bash
   npm start
   ```
   The app will be available at: **http://localhost:3000**

### 4. *JSON API Setup*
   - Ensure the backend API is correctly set up for fetching diary entries, attendance, and mock tests.
   - Adjust the sample JSON responses for testing as required.

---

## 🚀 Future Enhancements

- 🔔 **Push Notifications**: Real-time notifications for instant updates to parents and students.
- 📊 **Progress Tracking**: Detailed tracking of student performance and progress.
- 👨‍🏫 **User Role Enhancements**: Tailored dashboards for teachers, students, and admins.

---

## 🤝 Contribution Guidelines

We welcome contributions! Feel free to open issues or submit pull requests to help improve the system. Bug fixes, enhancements, and new ideas are always appreciated.

---

## 📄 License

This project is licensed under the **MIT License**. For more information, refer to the LICENSE file.

---

### 📷 Screenshots
![image](https://github.com/user-attachments/assets/99f053d8-8917-4513-a79f-bf5154f1c9db)
![image](https://github.com/user-attachments/assets/d41d8b2a-0e40-487e-87ad-1a9e12caf153)

[View more screenshots](https://github.com/user-attachments/assets/727a661c-65e0-4cfc-bf13-4a6675a1f4a1)

---

### 💡 We hope this School CRM System makes learning smoother for students and eases communication between parents and the school! 🎉
