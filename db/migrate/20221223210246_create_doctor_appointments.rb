class CreateDoctorAppointments < ActiveRecord::Migration[6.1]
  def change
    create_table :doctor_appointments do |t|
      t.string :notes
      t.date :date
      t.time :time
      t.references :patient, foreign_key: true
      t.references :doctor, foreign_key: true

      t.timestamps
    end
  end
end
