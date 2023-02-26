class PlaylistMusics < ActiveRecord::Migration[7.0]
  def change
    add_foreign_key :playlist_musics, :playlists
    add_foreign_key :playlist_musics, :musics
  end
end
