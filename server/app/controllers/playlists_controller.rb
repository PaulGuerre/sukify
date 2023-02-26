require_relative './spotify_scraper'

class PlaylistsController < ApplicationController
    use MiddlewareManager

    def index
        playlists = Playlist.all
        render json: playlists
    end

    def show
        playlist = Playlist.find(params[:id])
        render json: playlist
    end

    def add
        playlist = Playlist.new(name: params[:name])
        if playlist.save
            render json: { message: 'Successfully created' }
        else
            render json: { message: 'Error while creating' }
        end
    end

    def musics
        musics = Music.where(id: PlaylistMusic.where(playlist_id: params[:id]).pluck(:music_id))
        render json: musics
    end

    def addMusic
        playlistMusic = PlaylistMusic.new(playlist_id: Playlist.find(params[:id]).id, music_id: params[:musicId])
        if playlistMusic.save
            render json: { message: 'Successfully added music' }
        else
            render json: { message: 'Error while adding music' }
        end
    end

    def addSpotifyPlaylist      
        name, titles, videoIds = SpotifyScraper.scrapPlaylistVideoList(params[:url])
        
        playlist = Playlist.new(name: name)
        
        playlist.save

        for i in 1..(titles.length-1) do
            music = Music.new(title: titles[i], videoID: videoIds[i])
            music.save
            playlistMusic = PlaylistMusic.new(playlist_id: playlist.id, music_id: music.id)
            playlistMusic.save
        end
    end

    def delete
        playlistMusics = PlaylistMusic.where(playlist_id: params[:id])
        playlist = Playlist.find(params[:id])
        if playlistMusics.delete_all && playlist.delete
            render json: { message: 'Successfully deleted playlist' }
        else
            render json: { message: 'Error while deleting playlist' }
        end
    end

    def deleteMusic
        playlistMusic = PlaylistMusic.where(playlist_id: params[:id], music_id: params[:music_id])
        if playlistMusic.delete_all
            render json: { message: 'Successfully removed music' }
        else
            render json: { message: 'Error while removing music' }
        end
    end
end
