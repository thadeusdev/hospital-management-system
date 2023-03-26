# Doctor seeds
doctors = [
    {
        image:"https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg?w=2000", 
        full_name: "Dr. Joy Ndanu", 
        primary_practice: "Pediatrics", 
        secondary_practice: "Surgery",
        years_of_experience: 10,
        email: "doctor1@gmail.com",
        id: 1
    },
    {
        image:"https://as2.ftcdn.net/v2/jpg/02/60/04/09/1000_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg", full_name: "Michael Odhiambo", 
        primary_practice: "Pediatrics", 
        secondary_practice: "Surgery",
        years_of_experience: 10,
        email: "doctor2@gmail.com",
        id: 2
    },
    {
        image:"https://as1.ftcdn.net/v2/jpg/01/30/45/54/1000_F_130455409_fTuinPO1LXECv5hlk9VBREnL6yowYUo3.jpg", full_name: "Sarah Kamau", 
        primary_practice: "Pediatrics", 
        secondary_practice: "Surgery",
        years_of_experience: 10,
        email: "doctor3@gmail.com",
        id: 3
    },
    {
        image:"https://as1.ftcdn.net/v2/jpg/00/79/71/30/1000_F_79713072_dWCAZt6wPNFG5PqooCxAGsl4Mza7UfVy.jpg", full_name: "Dwight Shrute", 
        primary_practice: "Pediatrics", 
        secondary_practice: "Surgery",
        years_of_experience: 10,
        email: "doctor4@gmail.com",
        id: 4
    },
    {
        image:"https://as1.ftcdn.net/v2/jpg/01/32/94/46/1000_F_132944601_TzKWWNgwnBBsShz9UwWiUjTpoydpB5cV.jpg", full_name: "Andrew Benard", 
        primary_practice: "Pediatrics", 
        secondary_practice: "Surgery",
        years_of_experience: 10,
        email: "doctor5@gmail.com",
        id: 5
    }
]

puts "👨‍⚕️creating doctors..."

doctors.each{|doctor| Doctor.create!(doctor)}

# Patient seeds
patients = [
    {
        image:"https://images.pexels.com/photos/1472761/pexels-photo-1472761.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", 
        full_name: "John Kilonzo", 
        address: "Lavington 2nd Ave", 
        visiting_date: '2022-01-01', 
        visit_no: "GN-114730-21",
        age: 42,
        gender: "Male",
        id: 1,
    },
    {
        image:"https://images.pexels.com/photos/101537/baby-boy-hat-covered-101537.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", 
        full_name: "Musa Abdul", 
        address: "Mathare Area", 
        visiting_date: "2022-01-01", 
        visit_no: "GN-114730-22",        
        age: 20,
        gender: "Female",
        id: 2
    },
    {
        image:"https://images.pexels.com/photos/208134/pexels-photo-208134.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", 
        full_name: "Ezra Kipchumba", 
        address: "Kasarani Area", 
        visiting_date: "2022-01-01", 
        visit_no: "GN-114730-23",
        age: 30,
        gender: "Male",
        id: 3
    },
    {
        image:"https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", 
        full_name: "Wilson Owino", 
        address: "Nairobi CBD", 
        visiting_date: "2022-01-01", 
        visit_no: "GN-114730-24",
        age: 23,
        gender: "Female",
        id: 4
    },
    {
        image:"https://images.pexels.com/photos/371985/pexels-photo-371985.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", 
        full_name: "James Njorio", 
        address: "Pangani Area", 
        visiting_date: "2022-01-01", 
        visit_no: "GN-114730-25",
        age: 33,
        gender: "Other",
        id: 5
    }
]

puts " ♿creating patient"

patients.each{|patient| Patient.create!(patient)}

# Disease seeds
diseases = [
    {
        name: "Influenza", 
        symptoms: "fever, headache", 
        severity: "High",
        patient_id: 1,
        id: 1
    },
    {
        name: "Typhoid", 
        symptoms: "fever, headache", 
        severity: "High",
        patient_id: 2,
        id: 2
    },
    {
        name: "Cholera", 
        symptoms: "diarrhoea", 
        severity: "High",
        patient_id: 3,
        id: 3
    },
    {
        name: "Breast cancer", 
        symptoms: "diarrhoea", 
        severity: "High",
        patient_id: 4,
        id: 4
    },
    {
        name: "Diabetes", 
        symptoms: "diarrhoea", 
        severity: "High",
        patient_id: 5,
        id: 5
    }
]

puts " 🦠creating diseases..."

diseases.each{|disease| Disease.create!(disease)}

# Appointment seeds
appointments = [
    {
        date: '2022-01-01',
        time: '10:00', 
        patient_id: 1,
        doctor_id: 1,
        notes: "Normal checkup",
        id: 1
    },
    {
        date: '2022-01-01',
        time: '11:00', 
        patient_id: 2,
        doctor_id: 2,
        notes: "Normal checkup",
        id: 2
    },
    {
        date: '2022-01-01',
        time: '12:00', 
        patient_id: 3,
        doctor_id: 3,
        notes: "Normal checkup",
        id: 3
    },
    {
        date: '2022-01-01',
        time: '13:00', 
        patient_id: 4,
        doctor_id: 4,
        notes: "Normal checkup",
        id: 4
    },
    {
        date: '2022-01-01',
        time: '10:00', 
        patient_id: 5,
        doctor_id: 5,
        notes: "Normal checkup",
        id: 5
    },
]

puts " 📅creating appointments..."

appointments.each{|appointment| DoctorAppointment.create!(appointment)}

# Medicine seeds
medicines = [
    {
        image:"https://as2.ftcdn.net/v2/jpg/02/81/42/77/1000_F_281427785_gfahY8bX4VYCGo6jlfO8St38wS9cJQop.jpg", 
        name: "Asprine", 
        description: "for headache", 
        category: "Tablet", 
        is_acidic: true, 
        infant_safe: true, 
        patient_id: 1,
        dosage: '500mg',
        id: 1
    },
    {
        image:"https://as1.ftcdn.net/v2/jpg/00/93/01/00/1000_F_93010064_rhvBWAmpC1oZV2I8tDrtB7pp89TAJ960.jpg", 
        name: "Paracetamol", 
        description: "for headache", 
        category: "Tablet", 
        is_acidic: true, 
        infant_safe: true, 
        patient_id: 2,
        dosage: '200mg',
        id: 2
    },
    {
        image:"https://as1.ftcdn.net/v2/jpg/01/86/91/66/1000_F_186916617_oPPHwxkROZ9jdjXD9QAQcu7ygejiaWhF.jpg", 
        name: "Ibuprofen", 
        description: "for headache", 
        category: "Tablet", 
        is_acidic: true, 
        infant_safe: true, 
        patient_id: 3,
        dosage: '1000mg',
        id: 3
    },
    {
        image:"https://as1.ftcdn.net/v2/jpg/01/86/91/66/1000_F_186916617_oPPHwxkROZ9jdjXD9QAQcu7ygejiaWhF.jpg", 
        name: "Paracetamol", 
        description: "for headache", 
        category: "Tablet", 
        is_acidic: true, 
        infant_safe: true, 
        patient_id: 4,
        dosage: '1000mg',
        id: 4
    },
    {
        image:"https://as2.ftcdn.net/v2/jpg/02/81/42/79/1000_F_281427970_ybqCaoaBN5olT1Hs4IvBGiP3JazmFBN3.jpg", 
        name: "Asprine", 
        description: "for headache", 
        category: "Tablet", 
        is_acidic: true, 
        infant_safe: true, 
        patient_id: 5,
        dosage: '1000mg',
        id: 5
    },
]

puts " 💉creating medicines..."

medicines.each{|medicine| Medicine.create!(medicine)}

# Diagnostic seeds
diagnostics = [
    { 
        name: 'Blood test', 
        patient_id: 1,
        doctor_id: 1,
        disease_id: 1,
        performed_at: '13:00',
        pulse: 72, 
        sugar: 0.231, 
        temperature: 36.1, 
        pressure: 121.7,
        id: 1
    },
    { 
        name: 'X-ray', 
        patient_id: 2,
        doctor_id: 2,
        disease_id: 1,
        performed_at: '13:00',
        pulse: 72, 
        sugar: 0.231, 
        temperature: 36.1, 
        pressure: 121.7,
        id: 2
    },
    { 
        name: 'CT scan', 
        patient_id: 3,
        doctor_id: 3,
        disease_id: 1,
        performed_at: '13:00',
        pulse: 72, 
        sugar: 0.231, 
        temperature: 36.1, 
        pressure: 121.7,
        id: 3
    },
    { 
        name: 'Blood test', 
        patient_id: 4,
        doctor_id: 4,
        disease_id: 1,
        performed_at: '13:00',
        pulse: 72, 
        sugar: 0.231, 
        temperature: 36.1, 
        pressure: 121.7,
        id: 4
    },
    { 
        name: 'Blood test', 
        patient_id: 5,
        doctor_id: 5,
        disease_id: 1,
        performed_at: '13:00',
        pulse: 72, 
        sugar: 0.231, 
        temperature: 36.1, 
        pressure: 121.7,
        id: 5
    },
]

puts " 🔬creating diagnostics..."

diagnostics.each{|diagnostic| Diagnostic.create!(diagnostic)}

# Prescription seeds
prescriptions = [
    { 
        medicine_id: 1, 
        patient_id: 1,
        doctor_id: 1,
        disease_id: 1,
        frequency: "2 X 2", 
        duration: "7 days",
        id: 1
    },
    { 
        medicine_id: 2, 
        patient_id: 2,
        doctor_id: 2,
        disease_id: 2,
        frequency: "2 X 2", 
        duration: "7 days",
        id: 2
    },
    { 
        medicine_id: 3, 
        patient_id: 3,
        doctor_id: 3,
        disease_id: 3,
        frequency: "2 X 2", 
        duration: "7 days",
        id: 3
    },
    { 
        medicine_id: 4, 
        patient_id: 4,
        doctor_id: 4,
        disease_id: 4,
        frequency: "2 X 2", 
        duration: "7 days",
        id: 4
    },
    { 
        medicine_id: 5, 
        patient_id: 5,
        doctor_id: 5,
        disease_id: 5,
        frequency: "2 X 2", 
        duration: "7 days",
        id: 5
    },
]

puts " 📝creating prescriptions..."

prescriptions.each{|prescription| Prescription.create!(prescription)}

User.create!(username: "admin", password:'root')


puts " seeded successfully!"

