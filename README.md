# HOSPITAL MANAGEMENT SYSTEM
- Is a Full-stack application. i.e React - Frontend & Rails Backend.
## Objective
- The main objective for this project was to create a system that keeps track of the day to day hospital activities and people.
- We live in a world in world full of data and data management and handling was this project major concern.
## Backend(ERD)
![Database](/client/src/img/ERD-Hospital_Management_System.png "Optional title")
## User Abilities
- View general analytics on the Dashboard
- View, create, update, and delete doctor appointments.
- View, create, update, and delete doctors.
- View, create, update, and delete patients.
- View, create, update, and delete medicines.
- View, create, update, and delete diseases.
- View, create, update, and delete diagnostics.
- View, create, update, and delete prescriptions.
## Technical Nuances
* **Ruby On Rails** - Rails is a full-stack framework. It ships with all the tools needed to build amazing web apps on both the front and back end.
* **Sqlite3** - Is an Opensource databse management system.
* **React** - To create a wonderful frontend.
* **Vanila CSS** - To design good looking UI.
* **Heroku** - To deploy the App.
## User Experience
### Dashboard
![Dashboard](/client/src/img/Dashboard.png "Optional title")
### Doctor Appointments
![Appointments](/client/src/img/appointment.png "Optional title")
### Doctors
![Doctors](/client/src/img/Doctors.png "Optional title")
### Patients
![Patients](/client/src/img/Patients.png "Optional title")
### Diseases
![Diseases](/client/src/img/Diseases.png "Optional title")
### Diagnostics
![Diagnostics](/client/src/img/Diagnoses.png "Optional title")
![data-diagnose](/client/src/img/data-diagnose.png "Optional title")
### Medicines
![Medicines](/client/src/img/Medicines.png "Optional title")
## How to Run App
1. Comment out first validations for patient and user at their respective models
2. Open terminal and run ``bundle install`` to install the necessary gems
3. Run ``rails db:migrate db:seed``
4. Run ``rails s`` to start rails server (backend).
5. Open a different terminal and run ``npm install --prefix client`` to install the required dependencies
6. Run ``npm start --prefix client`` to start react frontend.
7. Sign up and login to enjoy the App.
