doctors = [
    {img:"https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg?w=2000", full_name: "Joy Ndanu", primary_practice: "Family Practice Physician", secondary_practice: "Internal medical doctor"},
    {img:"https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg?w=2000", full_name: "Michael Odhiambo", primary_practice: "Pediatrician", secondary_practice: "Internal medical doctor"},
    {img:"https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg?w=2000", full_name: "Sarah Kamau", primary_practice: "OB-GYNs (obsterics and gynecology)", secondary_practice: "Pediatrician"},
    {img:"https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg?w=2000", full_name: "Dwight Shrute", primary_practice: "Family Practice Physician", secondary_practice: "Pediatrician"},
    {img:"https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg?w=2000", full_name: "Andrew Benard", primary_practice: "Pediatrician", secondary_practice: "Family Practice Physician"}
]

puts "👨‍⚕️creating doctors..."

doctors.each{|doctor| Doctor.create(doctor)}

patients = [
    {img:"https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg?w=2000", full_name: "John Kilonzo", address: "Lavington 2nd Ave", visiting_date: DateTime.new(2009,9,1,17), visit_no: "GN-114730-21"},
    {img:"https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg?w=2000", full_name: "Musa Abdul", address: "Mathare Area", visiting_date: DateTime.new(2009,9,1,17), visit_no: "GN-114730-22"},
    {img:"https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg?w=2000", full_name: "Ezra Kipchumba", address: "Kasarani Area", visiting_date: DateTime.new(2009,9,1,17), visit_no: "GN-114730-23"},
    {img:"https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg?w=2000", full_name: "Wilson Owino", address: "Nairobi CBD", visiting_date: DateTime.new(2009,9,1,17), visit_no: "GN-114730-24"},
    {img:"https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg?w=2000", full_name: "James Njorio", address: "Pangani Area", visiting_date: DateTime.new(2009,9,1,17), visit_no: "GN-114730-25"}
]

puts " 🦽 creating patient"

patients.each{|patient| Patient.create(patient)}

diseases = [
    {name: "malaria", symptoms: "fever, headache", severity: "High"},
    {name: "Typhoid", symptoms: "fever, headache", severity: "High"},
    {name: "Cholera", symptoms: "diarrhoea", severity: "High"}
]

puts " 🦠creating diseases..."

diseases.each{|disease| Disease.create(disease)}

DoctorAppointment.create(notes: "Normal checkup", patient_id: 1, doctor_id: 1)

medicines = [
    {img:"https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg?w=2000", name: "Asprine", description: "for headache", category: "Tablet", is_acidic: true, infant_safe: true, patient_id: 1, disease_id: 1},
    {img:"https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg?w=2000", name: "Asprine", description: "for headache", category: "Tablet", is_acidic: true, infant_safe: true, patient_id: 1, disease_id: 1},
    {img:"https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg?w=2000", name: "Asprine", description: "for headache", category: "Tablet", is_acidic: true, infant_safe: true, patient_id: 1, disease_id: 1},
    {img:"https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg?w=2000", name: "Asprine", description: "for headache", category: "Tablet", is_acidic: true, infant_safe: true, patient_id: 1, disease_id: 1},
    {img:"https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg?w=2000", name: "Asprine", description: "for headache", category: "Tablet", is_acidic: true, infant_safe: true, patient_id: 1, disease_id: 1},
]

puts " creating medicines..."

medicines.each{|medicine| Medicine.create(medicine)}

Diagnostic.create(notes: "Chronic condition", disease_id: 1, patient_id: 1, diagnosed_on: DateTime.new(2009,9,1,17), pulse: 72, sugar: 0.231, temperature: 36.1, pressure: 121.7)

Prescription.create(notes: "2 X 2", medicine_id: 1, patient_id: 1)

puts " Done!!"