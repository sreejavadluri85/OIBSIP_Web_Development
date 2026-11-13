# 🚀 Django Portfolio Builder

A professional and responsive **Portfolio Builder Web Application** developed using Python and Django. This application allows users to create, edit, view, and delete personal developer portfolios through a simple and user-friendly interface.

Users can showcase their professional information, technical skills, education, projects, and social media profiles with a unique portfolio URL.

## ✨ Features

- **Create Portfolio:** Build a personal portfolio by entering your professional details.
- **Profile Photo Upload:** Upload an optional profile picture.
- **Unique Portfolio URL:** Each portfolio gets its own unique URL based on the user's name.
- **Edit Portfolio:** Update existing portfolio information whenever needed.
- **Delete Portfolio:** Remove an existing portfolio.
- **About Me Section:** Display a professional introduction.
- **Technical Skills:** Showcase programming languages and technical skills.
- **Education Details:** Display academic qualifications.
- **Projects Showcase:** Highlight completed projects.
- **Social Media Links:** Add GitHub and LinkedIn profile links.
- **Form Validation:** Validate names, email addresses, phone numbers, and profile photo size.
- **Responsive Design:** Access the portfolio builder on desktop and mobile devices.
- **Professional UI:** Modern dark-themed interface with a clean layout.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| Python | Backend programming |
| Django | Web framework |
| HTML5 | Page structure |
| CSS3 | Styling and responsive design |
| JavaScript | Frontend interactions |
| SQLite3 | Database |
| Pillow | Image processing |

## 📂 Project Structure

```text
OIBSIP_Web_Development/
│
├── config/
│   ├── settings.py
│   ├── urls.py
│   └── ...
│
├── portfolio/
│   ├── migrations/
│   ├── templates/
│   │   └── portfolio/
│   │       ├── builder.html
│   │       └── profile.html
│   ├── static/
│   ├── models.py
│   ├── forms.py
│   ├── views.py
│   ├── urls.py
│   └── admin.py
│
├── media/
│   └── profile_photos/
│
├── venv/
├── manage.py
├── db.sqlite3
├── requirements.txt
└── README.md
```

## ⚙️ Installation and Setup

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate to the project folder

```bash
cd OIBSIP_Web_Development
```

### 3. Create a virtual environment

```bash
python -m venv venv
```

### 4. Activate the virtual environment

**Windows PowerShell:**

```powershell
.\venv\Scripts\Activate.ps1
```

### 5. Install dependencies

```bash
pip install -r requirements.txt
```

### 6. Apply database migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### 7. Run the development server

```bash
python manage.py runserver
```

### 8. Open the application

Visit the following URL in your browser:

```text
http://127.0.0.1:8000/portfolio/
```

## 📌 How to Use

1. Open the Portfolio Builder application.
2. Enter your full name and professional title.
3. Upload a profile photo (optional).
4. Add your email address and phone number.
5. Write your professional introduction.
6. Enter your technical skills.
7. Add your education details.
8. Include your completed projects.
9. Add your GitHub and LinkedIn profile URLs.
10. Submit the form to generate your portfolio.
11. View your unique portfolio page.
12. Use the Edit and Delete options to manage your portfolio.

## 🔐 Form Validation

The application includes validation to improve data quality:

- Full name must contain valid letters and spaces.
- Email address must follow a valid email format.
- Phone number must contain 7–15 digits.
- Profile photo must be smaller than 5 MB.
- Profile photo upload is optional.

## 🎯 Project Objective

The main objective of this project is to develop a dynamic portfolio-building platform using Django. It demonstrates practical knowledge of backend development, database operations, Django forms, file uploads, URL routing, template rendering, and frontend design.

## 📚 Concepts Learned

- Django project and app structure
- Model creation and database migrations
- Django ModelForms
- Form validation
- CRUD operations
- Dynamic URL routing using slugs
- Image and media file handling
- Django views and templates
- Responsive web design
- Backend and frontend integration

## 👩‍💻 Internship Project

**Internship:** OASIS INFOBYTE

**Domain:** Web Development

**Project:** Task 2 – Portfolio Builder

**Framework:** Django

## 🌟 Future Enhancements

- User authentication and authorization
- Multiple portfolio templates
- Download portfolio as PDF
- Custom portfolio themes
- Public deployment and hosting

---

⭐ If you find this project useful, consider giving it a star on GitHub!

**Developed as part of the OASIS INFOBYTE Web Development Internship.**