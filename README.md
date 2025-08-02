# AcePrep: Adaptive Exam Preparation Platform

A web-based platform that offers personalized and adaptive learning experiences for students preparing for exams. The platform dynamically adjusts content and difficulty based on student performance, providing targeted practice and clear progress visualization.

## Features

### Student Features
- **User Authentication**: Sign up, log in, and profile management
- **Dynamic Question Generation**: Adaptive difficulty based on performance
- **Personalized Study Plans**: AI-generated study recommendations
- **Progress Visualization**: Charts and graphs showing performance trends
- **Practice Exams**: Timed exams with detailed performance reports

### Administrator Features
- **Content Management System**: Add, edit, and manage questions
- **User Management**: Monitor student activity and accounts
- **Analytics Dashboard**: Aggregate performance data and insights

## Tech Stack

- **Frontend**: React.js with Tailwind CSS
- **Backend**: Node.js with Express
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Hosting**: Firebase Hosting

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Firebase account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd aceprep
```

2. Install dependencies:
```bash
npm install
```

3. Set up Firebase:
   - Create a Firebase project
   - Enable Firestore and Authentication
   - Add your Firebase config to `src/config/firebase.js`

4. Start the development server:
```bash
npm start
```

## Project Structure

```
aceprep/
├── public/
├── src/
│   ├── components/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── questions/
│   │   └── admin/
│   ├── pages/
│   ├── services/
│   ├── utils/
│   └── config/
├── package.json
└── README.md
```

## Development Roadmap

- **Sprint 1**: Foundational Setup ✅
- **Sprint 2**: Adaptive Logic & Content Management
- **Sprint 3**: Personalized Insights & Reporting
- **Sprint 4**: Final Touches & Quality Assurance

## Contributing

This project follows an agile development methodology. Each sprint focuses on specific features and improvements.

## License

MIT License