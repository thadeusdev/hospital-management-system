doctors = [
    {img:"https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg?w=2000", full_name: "Joy Ndanu", primary_practice: "Family Practice Physician", secondary_practice: "Internal medical doctor"},
    {img:"https://as2.ftcdn.net/v2/jpg/02/60/04/09/1000_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg", full_name: "Michael Odhiambo", primary_practice: "Pediatrician", secondary_practice: "Internal medical doctor"},
    {img:"https://as1.ftcdn.net/v2/jpg/01/30/45/54/1000_F_130455409_fTuinPO1LXECv5hlk9VBREnL6yowYUo3.jpg", full_name: "Sarah Kamau", primary_practice: "OB-GYNs (obsterics and gynecology)", secondary_practice: "Pediatrician"},
    {img:"https://as1.ftcdn.net/v2/jpg/00/79/71/30/1000_F_79713072_dWCAZt6wPNFG5PqooCxAGsl4Mza7UfVy.jpg", full_name: "Dwight Shrute", primary_practice: "Family Practice Physician", secondary_practice: "Pediatrician"},
    {img:"https://as1.ftcdn.net/v2/jpg/01/32/94/46/1000_F_132944601_TzKWWNgwnBBsShz9UwWiUjTpoydpB5cV.jpg", full_name: "Andrew Benard", primary_practice: "Pediatrician", secondary_practice: "Family Practice Physician"}
]

puts "👨‍⚕️creating doctors..."

doctors.each{|doctor| Doctor.create(doctor)}

patients = [
    {img:"https://images.pexels.com/photos/1472761/pexels-photo-1472761.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", full_name: "John Kilonzo", address: "Lavington 2nd Ave", visiting_date: DateTime.new(2009,9,1,17), visit_no: "GN-114730-21"},
    {img:"https://images.pexels.com/photos/101537/baby-boy-hat-covered-101537.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", full_name: "Musa Abdul", address: "Mathare Area", visiting_date: DateTime.new(2009,9,1,17), visit_no: "GN-114730-22"},
    {img:"https://images.pexels.com/photos/208134/pexels-photo-208134.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", full_name: "Ezra Kipchumba", address: "Kasarani Area", visiting_date: DateTime.new(2009,9,1,17), visit_no: "GN-114730-23"},
    {img:"https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", full_name: "Wilson Owino", address: "Nairobi CBD", visiting_date: DateTime.new(2009,9,1,17), visit_no: "GN-114730-24"},
    {img:"https://images.pexels.com/photos/371985/pexels-photo-371985.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", full_name: "James Njorio", address: "Pangani Area", visiting_date: DateTime.new(2009,9,1,17), visit_no: "GN-114730-25"}
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
    {img:"https://as2.ftcdn.net/v2/jpg/02/81/42/77/1000_F_281427785_gfahY8bX4VYCGo6jlfO8St38wS9cJQop.jpg", name: "Asprine", description: "for headache", category: "Tablet", is_acidic: true, infant_safe: true, patient_id: 1, disease_id: 1},
    {img:"https://as1.ftcdn.net/v2/jpg/00/93/01/00/1000_F_93010064_rhvBWAmpC1oZV2I8tDrtB7pp89TAJ960.jpg", name: "Asprine", description: "for headache", category: "Tablet", is_acidic: true, infant_safe: true, patient_id: 1, disease_id: 1},
    {img:"https://as1.ftcdn.net/v2/jpg/01/86/91/66/1000_F_186916617_oPPHwxkROZ9jdjXD9QAQcu7ygejiaWhF.jpg", name: "Asprine", description: "for headache", category: "Tablet", is_acidic: true, infant_safe: true, patient_id: 1, disease_id: 1},
    {img:"https://as1.ftcdn.net/v2/jpg/01/86/91/66/1000_F_186916617_oPPHwxkROZ9jdjXD9QAQcu7ygejiaWhF.jpg", name: "Asprine", description: "for headache", category: "Tablet", is_acidic: true, infant_safe: true, patient_id: 1, disease_id: 1},
    {img:"https://as2.ftcdn.net/v2/jpg/02/81/42/79/1000_F_281427970_ybqCaoaBN5olT1Hs4IvBGiP3JazmFBN3.jpg", name: "Asprine", description: "for headache", category: "Tablet", is_acidic: true, infant_safe: true, patient_id: 1, disease_id: 1},
]

puts " creating medicines..."

medicines.each{|medicine| Medicine.create(medicine)}

Diagnostic.create(notes: "Chronic condition", disease_id: 1, patient_id: 1, diagnosed_on: DateTime.new(2009,9,1,17), pulse: 72, sugar: 0.231, temperature: 36.1, pressure: 121.7)

Prescription.create(notes: "2 X 2", medicine_id: 1, patient_id: 1)

puts " Done!!"