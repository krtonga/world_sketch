class CreateSketches < ActiveRecord::Migration
  def change
    create_table :sketches do |t|
      t.text :data
      t.string :artist
      t.string :location
      t.string :group

      t.timestamps
    end
  end
end
