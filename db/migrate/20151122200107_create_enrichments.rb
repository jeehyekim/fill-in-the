class CreateEnrichments < ActiveRecord::Migration
  def change
    create_table :enrichments do |t|
      
      
      t.timestamps null: false
    end
  end
end
