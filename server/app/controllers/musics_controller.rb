class MusicsController < ApplicationController
    def index
        musics = Music.all
        render json: musics
    end

    def play
        music = Music.find(params[:id])
        render file: "#{ Rails.root }/src/#{ music.title }.mp3"
    end

    def add
        music = Music.new(title: params[:title], url: params[:url])
        if music.save
            system("youtube-dl -o #{ Rails.root }/src/'%(title)s.%(ext)s' --extract-audio --audio-format mp3 #{ params[:url] }")
            render json: { message: 'success' }
        else
            render json: { message: 'error' }
        end
    end

    def delete
        music = Music.find(params[:id])
        path = "#{ Rails.root }/src/#{ music.title }.mp3"
        File.delete(path.tr('"', "'"))
        if music.delete && !File.exist?(path.tr('"', "'"))
            render json: { message: 'success' }
        else
            render json: { message: 'error' }
        end
    end
end
