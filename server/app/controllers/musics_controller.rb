class MusicsController < ApplicationController
    def index
        musics = Music.all
        render json: musics
    end

    def play
        music = Music.find(params[:id])
        render file: "#{ Rails.root }/src/#{ music.id }.mp3"
    end

    def add
        music = Music.new(title: params[:title], videoID: params[:videoID])
        system("yt-dlp -o #{ Rails.root }/src/#{ music.id }'.%(ext)s' --extract-audio --audio-format mp3 https://www.youtube.com/watch?v=#{ params[:videoID] }")
        if music.save && File.exist?("#{ Rails.root }/src/#{ music.id }.mp3")
            render json: { message: 'success' }
        else
            render json: { message: 'error' }
        end
    end

    def delete
        music = Music.find(params[:id])
        File.delete("#{ Rails.root }/src/#{ music.id }.mp3")
        if music.delete && !File.exist?("#{ Rails.root }/src/#{ music.id }.mp3")
            render json: { message: 'success' }
        else
            render json: { message: 'error' }
        end
    end
end
