doctors = [
    {full_name: "Joy Ndanu", primary_practice: "Family Practice Physician", secondary_practice: "Internal medical doctor"},
    {full_name: "Michael Odhiambo", primary_practice: "Pediatrician", secondary_practice: "Internal medical doctor"},
    {full_name: "Sarah Kamau", primary_practice: "OB-GYNs (obsterics and gynecology)", secondary_practice: "Pediatrician"},
    {full_name: "Dwight Shrute", primary_practice: "Family Practice Physician", secondary_practice: "Pediatrician"},
    {full_name: "Andrew Benard", primary_practice: "Pediatrician", secondary_practice: "Family Practice Physician"}
]

puts "👨‍⚕️creating doctors..."

doctors.each{|doctor| Doctor.create(doctor)}

patients = [
    {full_name: "John Kilonzo", address: "Lavington 2nd Ave", visiting_date: "12/01/2021", visit_no: "GN-114730-21"},
    {full_name: "Musa Abdul", address: "Mathare Area", visiting_date: "12/01/2021", visit_no: "GN-114730-22"},
    {full_name: "Ezra Kipchumba", address: "Kasarani Area", visiting_date: "12/01/2021", visit_no: "GN-114730-23"},
    {full_name: "Wilson Owino", address: "Nairobi CBD", visiting_date: "12/01/2021", visit_no: "GN-114730-24"},
    {full_name: "James Njorio", address: "Pangani Area", visiting_date: "12/01/2021", visit_no: "GN-114730-25"}
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

DoctorAppoint.create(notes: "Normal checkup", patient_id: 1, doctor_id: 1)

Medicine.create(name: "Asprine", patient_id: 1, disease_id: 1)

Diagnostic.create(notes: "Chronic condition", disease_id: 1, patient_id: 1, diagnosed_on: "12/01/2021", pulse: 72, sugar: 0.231, temperature: 36.1, pressure: 121.7)

Prescription.create(notes: "2 X 2", medicine_id: 1, patient_id: 1)

puts " Done!!"