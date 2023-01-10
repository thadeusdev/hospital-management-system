class CreateDoctorAppointments < ActiveRecord::Migration[6.1]
  def change
    create_table :doctor_appointments do |t|
      t.string :notes
      t.date :date
      t.time :time
      t.belongs_to :doctor, null: false, foreign_key: true
      t.belongs_to :patient, null: false, foreign_key: true

      t.timestamps
    end
  end
end
