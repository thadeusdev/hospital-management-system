class AddInventoryFieldsToMedicines < ActiveRecord::Migration[6.1]
  def change
    add_column :medicines, :reorder_level, :integer, null: false, default: 10
    add_column :medicines, :unit,          :string,  default: "tablet"

    remove_column :medicines, :patient_id, :integer
  end
end