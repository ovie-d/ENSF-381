================================================================================
ENSF-381 PROJECT DEPENDENCIES AND INSTALLATION GUIDE
================================================================================

This document lists all dependencies for the various React and Python projects
in the ENSF-381 workspace, along with installation commands.

================================================================================
PART 1: REACT/JAVASCRIPT PROJECTS
================================================================================

All React projects use npm for package management. Prerequisites:
- Node.js (v14 or higher recommended)
- npm (comes with Node.js)

Note: react-router-dom is used specifically in the sweet-scoop-app project 
for client-side routing functionality.

================================================================================
PROJECT 1: Assignment 3 - sweet-scoop-app (WITH react-router-dom)
================================================================================

Location: /Assignment 3/sweet-scoop-app

Installation Command:
npm install

The following dependencies will be installed:

PRODUCTION DEPENDENCIES:
  - react@^19.2.4
  - react-dom@^19.2.4
  - react-router-dom@^7.13.2          (Client-side routing library)
  - react-scripts@5.0.1
  - web-vitals@^2.1.4

DEVELOPMENT DEPENDENCIES:
  - @testing-library/dom@^10.4.1
  - @testing-library/jest-dom@^6.9.1
  - @testing-library/react@^16.3.2
  - @testing-library/user-event@^13.5.0

To install this specific project:
cd Assignment\ 3/sweet-scoop-app
npm install

To start the development server:
npm start

To build for production:
npm build

To run tests:
npm test

================================================================================
PROJECT 2: Lab 05 - jsx-exercise
================================================================================

Location: /lab-05/jsx-exercise

Installation Command:
npm install

The following dependencies will be installed:

PRODUCTION DEPENDENCIES:
  - react@^19.2.4
  - react-dom@^19.2.4
  - react-scripts@5.0.1
  - web-vitals@^2.1.4

DEVELOPMENT DEPENDENCIES:
  - @testing-library/dom@^10.4.1
  - @testing-library/jest-dom@^6.9.1
  - @testing-library/react@^16.3.2
  - @testing-library/user-event@^13.5.0

To install this specific project:
cd lab-05/jsx-exercise
npm install

To start the development server:
npm start

To build for production:
npm build

To run tests:
npm test

================================================================================
PROJECT 3: Lab 06 - Starter
================================================================================

Location: /lab-06/Lab06/Starter

Installation Command:
npm install

The following dependencies will be installed:

PRODUCTION DEPENDENCIES:
  - react@^19.2.4
  - react-dom@^19.2.4
  - react-scripts@5.0.1
  - web-vitals@^2.1.4

DEVELOPMENT DEPENDENCIES:
  - @testing-library/dom@^10.4.1
  - @testing-library/jest-dom@^6.9.1
  - @testing-library/react@^16.3.2
  - @testing-library/user-event@^13.5.0

To install this specific project:
cd lab-06/Lab06/Starter
npm install

To start the development server:
npm start

To build for production:
npm build

To run tests:
npm test

================================================================================
PROJECT 4: Lab 08 - Frontend
================================================================================

Location: /lab-08/Students/frontend

Installation Command:
npm install

The following dependencies will be installed:

PRODUCTION DEPENDENCIES:
  - react@^18.2.0
  - react-dom@^18.2.0
  - react-scripts@^5.0.1
  - web-vitals@^2.1.4

DEVELOPMENT DEPENDENCIES:
  - @testing-library/dom@^10.4.1
  - @testing-library/jest-dom@^6.9.1
  - @testing-library/react@^16.3.2
  - @testing-library/user-event@^13.5.0

To install this specific project:
cd lab-08/Students/frontend
npm install

To start the development server:
npm start

To build for production:
npm build

To run tests:
npm test

================================================================================
PART 2: PYTHON PROJECTS
================================================================================

Python projects use pip for package management. Prerequisites:
- Python 3.7 or higher
- pip (comes with Python)
- python-venv (for virtual environments - recommended)

================================================================================
PROJECT 5: Lab 08 - Backend
================================================================================

Location: /lab-08/Students/backend

Installation Instructions:

1. Create a virtual environment (recommended):
python3 -m venv .venv

2. Activate the virtual environment:
On macOS/Linux:
source .venv/bin/activate

On Windows:
.venv\Scripts\activate

3. Install dependencies from requirements.txt:
pip install -r requirements.txt

The following dependencies will be installed:

PRODUCTION DEPENDENCIES:
  - Flask==3.0.3                    (Web framework)
  - flask-cors==4.0.1               (CORS support for Flask)
  - joblib==1.5.3                   (Serialization utilities)
  - pandas==2.3.3                   (Data manipulation library)
  - scikit-learn==1.6.1             (Machine learning library)

To run the Flask application:
python app.py

To deactivate the virtual environment:
deactivate

================================================================================
SUMMARY OF ALL DEPENDENCIES
================================================================================

JAVASCRIPT/REACT PACKAGES:
- react@^19.2.4 (or ^18.2.0 for Lab 08 frontend)
- react-dom@^19.2.4 (or ^18.2.0 for Lab 08 frontend)
- react-router-dom@^7.13.2 (ONLY in sweet-scoop-app)
- react-scripts@5.0.1
- web-vitals@^2.1.4
- @testing-library/react@^16.3.2
- @testing-library/jest-dom@^6.9.1
- @testing-library/user-event@^13.5.0
- @testing-library/dom@^10.4.1

PYTHON PACKAGES:
- Flask==3.0.3
- flask-cors==4.0.1
- joblib==1.5.3
- pandas==2.3.3
- scikit-learn==1.6.1

================================================================================
TOTAL INSTALLATION COMMANDS (Global Overview)
================================================================================

To install ALL React projects:

cd Assignment\ 3/sweet-scoop-app && npm install
cd ../../lab-05/jsx-exercise && npm install
cd ../../lab-06/Lab06/Starter && npm install
cd ../../lab-08/Students/frontend && npm install

To install the Python backend:

cd lab-08/Students/backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

================================================================================
NOTES
================================================================================

1. react-router-dom (^7.13.2) is specifically used in the Assignment 3 
   sweet-scoop-app project for implementing client-side routing.

2. Different projects use different versions of React:
   - Assignment 3, Lab 05, Lab 06: React ^19.2.4
   - Lab 08 Frontend: React ^18.2.0

3. All React projects use react-scripts@5.0.1 for build tooling.

4. Testing libraries are included in all React projects for unit testing.

5. Python backend requires a virtual environment for proper dependency 
   isolation. Follow the activation instructions before installing packages.

6. After installing dependencies, consult the individual project README files 
   for specific usage and configuration instructions.

================================================================================
