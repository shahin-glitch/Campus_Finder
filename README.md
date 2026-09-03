# Campus Finder

## College & Student Stay Guidance Platform

Campus Finder is a web-based college discovery and admission guidance platform designed to help students and parents explore colleges, courses, fees, placements, and student accommodation in Mangalore and across Karnataka.

The platform brings important college and student-stay information together in one place, making it easier for students to compare their options before making an admission decision.

---

## 🚀 Features

### 🎓 College Directory

- Browse colleges across Karnataka
- Search colleges by name, course, or location
- Filter colleges by:
  - Discipline / Stream
  - City / Location
  - Annual Fee
  - Minimum Rating
  - Hostel Availability
  - Placement Rate
- View college ratings and reviews
- View accreditation and approval information
- View starting annual fees
- View placement percentage
- View top courses
- Check hostel availability
- View information verification dates

### 📚 Course Explorer

Explore popular undergraduate and postgraduate courses across different categories:

- Engineering
- Medical
- Management
- Computer Applications
- Arts & Science
- Paramedical & Allied

Each course can display information such as:

- Course duration
- Number of colleges offering the course
- Average annual fee
- Colleges offering the course

### ⚖️ College Comparison

Students can compare multiple colleges side-by-side based on important factors such as:

- Ratings & reviews
- Annual fees
- Accreditations
- Placement percentage
- Key courses
- Hostel availability
- Data verification date

This helps students evaluate colleges before shortlisting them.

### 🏠 Stay Finder

Find student accommodation in Mangalore, including:

- Boys Hostels
- Girls Hostels
- Co-ed Hostels
- PGs
- Student Rooms

Users can filter accommodations by:

- Area
- Occupant gender
- Property type
- Monthly budget
- Amenities

Accommodation listings can include:

- Monthly rent
- Nearby colleges/campuses
- Distance from campuses
- Available amenities
- Verification date
- WhatsApp enquiry option

### 💬 Student Counselling

Students and parents can contact counsellors for guidance related to:

- College admissions
- Course selection
- Fees
- Cutoffs
- College options
- Hostel / PG enquiries

The platform provides WhatsApp and phone-based enquiry options.

---

## 🛠️ Technology Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend & Data

- Next.js API routes
- PostgreSQL
- Drizzle ORM

### Deployment

- Vercel

### Other Services

- WhatsApp integration for enquiries
- Google Maps / Google Reviews links
- Environment variables for API keys and database credentials

---

## 📁 Project Structure

```text
Campus Finder/
│
├── src/
│   ├── app/
│   │   ├── about/
│   │   ├── colleges/
│   │   ├── compare/
│   │   ├── contact/
│   │   ├── courses/
│   │   └── stay/
│   │
│   └── ...
│
├── public/
│   └── ...
│
├── drizzle/
│   └── ...
│
├── package.json
├── package-lock.json
├── drizzle.config.ts
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── .env.example
└── .gitignore




### ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd Campus-Finder
npm install

Create a .env.local file in the root directory of the project.
DATABASE_URL=your_database_url
GEMINI_API_KEY=your_api_key

npm run dev

open on local host.