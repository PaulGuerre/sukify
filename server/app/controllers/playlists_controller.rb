class PlaylistsController < ApplicationController
    def index
        playlists = Playlist.all
        render json: playlists
    end

    def add
        playlist = Playlist.new(name: params[:name])
        if playlist.save
            render json: { message: 'success' }
        else
            render json: { message: 'error' }
        end
    end

    def name
        playlist = Playlist.where(name: params[:name])
        render json: playlist
    end

    def musics
        musics = Music.where(id: PlaylistMusic.where(playlist_id: params[:id]).pluck(:music_id))
        render json: musics
    end

    def addMusic
        playlistMusic = PlaylistMusic.new(playlist_id: Playlist.find(params[:id]).id, music_id: params[:musicId])
        if playlistMusic.save
            render json: { message: 'success' }
        else
            render json: { message: 'error' }
        end
    end

    def delete
        playlistMusics = PlaylistMusic.where(playlist_id: params[:id])
        playlist = Playlist.find(params[:id])
        if playlistMusics.delete_all && playlist.delete
            render json: { message: 'success' }
        else
            render json: { message: 'error' }
        end
    end

    def deleteMusic
        playlistMusic = PlaylistMusic.where(playlist_id: params[:id], music_id: params[:music_id])
        if playlistMusic.delete_all
            render json: { message: 'success' }
        else
            render json: { message: 'error' }
        end
    end

    def update
        playlist = Playlist.find(params[:id])
        playlist.update(name: params[:name])
        if playlist.save
            render json: { message: 'success' }
        else
            render json: { message: 'error' }
        end
    end
end
