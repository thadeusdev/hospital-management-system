class CreateDoctorAppointments < ActiveRecord::Migration[6.1]
  def change
    create_table :doctor_appointments do |t|
      t.string :notes
      t.integer :patient_id
      t.integer :patient_id

      t.timestamps
    end
  end
end
