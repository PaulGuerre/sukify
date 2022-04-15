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
end
