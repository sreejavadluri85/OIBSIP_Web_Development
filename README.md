
# 🚀 OASIS INFOBYTE – Web Development Internship

A collection of three web development projects completed as part of the **OASIS INFOBYTE (OIBSIP) Web Development Internship**.

All three projects are developed using Python and Django, with HTML, CSS, and JavaScript for the frontend.

## 📌 Projects Overview

| Task | Project | Description |
|---|---|---|
| Task 1 | Landing Page | A responsive and modern landing page. |
| Task 2 | Portfolio Builder | A dynamic application to create and manage developer portfolios. |
| Task 3 | THERMO – Temperature Converter | A temperature conversion application supporting Celsius, Fahrenheit, and Kelvin. |

---

## ✨ Task 1 – Landing Page

A modern and responsive landing page developed using web technologies.

### Features
- Clean and modern user interface
- Responsive layout
- Attractive sections and navigation
- Interactive frontend elements
- User-friendly design

### Technologies
- HTML5
- CSS3
- JavaScript
- Django

---

## 💼 Task 2 – Django Portfolio Builder

A professional and responsive **Portfolio Builder Web Application** developed using Python and Django.

Users can create, edit, view, and delete personal developer portfolios through a simple interface. Each portfolio has a unique URL based on the user's name.

### Features
- Create and manage developer portfolios
- Optional profile photo upload
- Unique portfolio URL using slugs
- Edit and delete portfolio details
- About Me section
- Technical skills showcase
- Education details
- Projects showcase
- GitHub and LinkedIn profile links
- Form validation
- Responsive design
- Professional dark-themed interface

### Technologies
- Python
- Django
- HTML5
- CSS3
- JavaScript
- SQLite3
- Pillow

---

## 🌡️ Task 3 – THERMO Temperature Converter

**THERMO** is a modern and responsive temperature conversion application that converts temperatures between Celsius, Fahrenheit, and Kelvin.

### Features
- Celsius to Fahrenheit conversion
- Celsius to Kelvin conversion
- Fahrenheit to Celsius conversion
- Fahrenheit to Kelvin conversion
- Kelvin to Celsius conversion
- Kelvin to Fahrenheit conversion
- Quick temperature presets
- Input validation
- Individual result copy buttons
- Copy all results
- Conversion history using local storage
- Clear history option
- Dark and light theme toggle
- Responsive user interface

### Technologies
- Python
- Django
- HTML5
- CSS3
- JavaScript

---

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

---

## 📂 Project Structure

```text
OIBSIP_Web_Development/
│
├── config/
│   ├── settings.py
│   ├── urls.py
│   └── ...
│
├── landing/
│   ├── templates/
│   ├── static/
│   ├── views.py
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
│   └── ...
│
├── converter/
│   ├── templates/
│   │   └── converter/
│   │       └── index.html
│   ├── static/
│   │   └── converter/
│   │       ├── css/
│   │       └── js/
│   ├── views.py
│   ├── urls.py
│   └── ...
│
├── media/
│   └── profile_photos/
│
├── manage.py
├── requirements.txt
├── README.md
└── .gitignore
```

---

## ⚙️ Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/sreejavadluri85/OIBSIP_Web_Development.git
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

**Windows Command Prompt:**

```cmd
venv\Scripts\activate
```

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
python manage.py migrate
```

### 7. Run the development server

```bash
python manage.py runserver
```

### 8. Open the projects

Visit the following URLs in your browser:

| Project | Local URL |
|---|---|
| Landing Page | http://127.0.0.1:8000/ |
| Portfolio Builder | http://127.0.0.1:8000/portfolio/ |
| THERMO Converter | http://127.0.0.1:8000/converter/ |

*These URLs should match the routes configured in `config/urls.py` and the individual app URL files.*

---

## 📚 Concepts and Skills Learned

- Python programming
- Django project and app architecture
- Django views and URL routing
- HTML, CSS, and JavaScript integration
- Django templates
- Database models and migrations
- Django ModelForms and form validation
- CRUD operations
- Dynamic URL routing using slugs
- Image and media file handling
- JavaScript DOM manipulation
- Browser local storage
- Responsive web design
- Frontend and backend integration
- Git and GitHub version control

---

## 🎯 Internship Details

**Organization:** OASIS INFOBYTE

**Internship Domain:** Web Development

**Internship Program:** OIBSIP

**Projects Completed:**
1. Task 1 – Landing Page
2. Task 2 – Portfolio Builder
3. Task 3 – Temperature Converter

---

## 🚀 Future Enhancements

- Deploy projects to a production server
- Add more interactive features
- Improve accessibility
- Add additional portfolio templates
- Introduce more temperature and unit conversion options

---

⭐ If you find these projects useful, consider giving this repository a star!

**Developed as part of the OASIS INFOBYTE Web Development Internship.**
```