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

ActiveRecord::Schema.define(version: 2026_11_10_042615) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

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
  end

  create_table "diseases", force: :cascade do |t|
    t.string "name"
    t.string "symptoms"
    t.string "severity"
    t.integer "patient_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "doctor_appointments", force: :cascade do |t|
    t.string "notes"
    t.date "date"
    t.time "time"
    t.integer "doctor_id", null: false
    t.integer "patient_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
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
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "reorder_level", default: 10, null: false
    t.string "unit", default: "tablet"
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
  end

  create_table "stock_batches", force: :cascade do |t|
    t.bigint "medicine_id", null: false
    t.string "batch_number", null: false
    t.date "expiry_date", null: false
    t.integer "quantity", default: 0, null: false
    t.date "received_at", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["expiry_date"], name: "index_stock_batches_on_expiry_date"
    t.index ["medicine_id", "batch_number"], name: "index_stock_batches_on_medicine_id_and_batch_number", unique: true
    t.index ["medicine_id"], name: "index_stock_batches_on_medicine_id"
  end

  create_table "stock_movements", force: :cascade do |t|
    t.bigint "stock_batch_id", null: false
    t.string "kind", null: false
    t.integer "quantity", null: false
    t.string "reason"
    t.bigint "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["stock_batch_id", "created_at"], name: "index_stock_movements_on_stock_batch_id_and_created_at"
    t.index ["stock_batch_id"], name: "index_stock_movements_on_stock_batch_id"
    t.index ["user_id"], name: "index_stock_movements_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "role"
    t.string "image"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "stock_batches", "medicines"
  add_foreign_key "stock_movements", "stock_batches"
  add_foreign_key "stock_movements", "users"
end
