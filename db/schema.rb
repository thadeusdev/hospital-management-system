# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2023_01_09_214825) do

  create_table "diagnostics", force: :cascade do |t|
    t.string "name"
    t.datetime "performed_at"
    t.integer "pulse"
    t.decimal "sugar"
    t.decimal "temperature"
    t.decimal "pressure"
    t.integer "doctor_id", null: false
    t.integer "patient_id", null: false
    t.integer "disease_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["disease_id"], name: "index_diagnostics_on_disease_id"
    t.index ["doctor_id"], name: "index_diagnostics_on_doctor_id"
    t.index ["patient_id"], name: "index_diagnostics_on_patient_id"
  end

  create_table "diseases", force: :cascade do |t|
    t.string "name"
    t.string "symptoms"
    t.string "severity"
    t.integer "patient_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["patient_id"], name: "index_diseases_on_patient_id"
  end

  create_table "doctor_appointments", force: :cascade do |t|
    t.string "notes"
    t.date "date"
    t.time "time"
    t.integer "doctor_id", null: false
    t.integer "patient_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["doctor_id"], name: "index_doctor_appointments_on_doctor_id"
    t.index ["patient_id"], name: "index_doctor_appointments_on_patient_id"
  end

  create_table "doctors", force: :cascade do |t|
    t.string "image"
    t.string "full_name"
    t.string "email"
    t.string "primary_practice"
    t.string "secondary_practice"
    t.integer "years_of_experience"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "medicines", force: :cascade do |t|
    t.string "image"
    t.string "name"
    t.string "dosage"
    t.string "description"
    t.string "category"
    t.boolean "is_acidic"
    t.boolean "infant_safe"
    t.integer "patient_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["patient_id"], name: "index_medicines_on_patient_id"
  end

  create_table "patients", force: :cascade do |t|
    t.string "image"
    t.string "full_name"
    t.integer "age"
    t.string "gender"
    t.string "address"
    t.date "visiting_date"
    t.string "visit_no"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "prescriptions", force: :cascade do |t|
    t.string "frequency"
    t.string "duration"
    t.integer "medicine_id", null: false
    t.integer "disease_id", null: false
    t.integer "doctor_id", null: false
    t.integer "patient_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["disease_id"], name: "index_prescriptions_on_disease_id"
    t.index ["doctor_id"], name: "index_prescriptions_on_doctor_id"
    t.index ["medicine_id"], name: "index_prescriptions_on_medicine_id"
    t.index ["patient_id"], name: "index_prescriptions_on_patient_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "diagnostics", "diseases"
  add_foreign_key "diagnostics", "doctors"
  add_foreign_key "diagnostics", "patients"
  add_foreign_key "diseases", "patients"
  add_foreign_key "doctor_appointments", "doctors"
  add_foreign_key "doctor_appointments", "patients"
  add_foreign_key "medicines", "patients"
  add_foreign_key "prescriptions", "diseases"
  add_foreign_key "prescriptions", "doctors"
  add_foreign_key "prescriptions", "medicines"
  add_foreign_key "prescriptions", "patients"
end
