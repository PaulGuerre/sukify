class MusicsController < ApplicationController
    def index
        musics = Music.all
        render json: musics
    end

    def play
        music = Music.find(params[:id])
        render file: "#{ Rails.root }/src/musics/#{ music.id }.mp3"
    end

    def add
        music = Music.new(title: params[:title], url: params[:url])
        if music.save
            system("youtube-dl -o #{ Rails.root }/src/musics/#{ music.id }'.%(ext)s' --extract-audio --audio-format mp3 #{ params[:url] }")
            system("youtube-dl -o #{ Rails.root }/src/thumbnails/#{ music.id } --write-thumbnail --skip-download #{ params[:url] }")
            if File.exist?("#{ Rails.root }/src/thumbnails/#{ music.id }.webp")
                system("mv #{ Rails.root }/src/thumbnails/#{ music.id}.webp #{ Rails.root }/src/thumbnails/#{ music.id }.png")
            elsif File.exist?("#{ Rails.root }/src/thumbnails/#{ music.id }.jpg")
                system("mv #{ Rails.root }/src/thumbnails/#{ music.id}.jpg #{ Rails.root }/src/thumbnails/#{ music.id }.png")
            end
            render json: { message: 'success' }
        else
            render json: { message: 'error' }
        end
    end

    def delete
        music = Music.find(params[:id])
        File.delete("#{ Rails.root }/src/musics/#{ music.id }.mp3")
        File.delete("#{ Rails.root }/src/thumbnails/#{ music.id }.png")
        if music.delete && !File.exist?("#{ Rails.root }/src/musics/#{ music.id }.mp3") && !File.exist?("#{ Rails.root }/src/thumbnails/#{ music.id }.png")
            render json: { message: 'success' }
        else
            render json: { message: 'error' }
        end
    end

    def thumbnail
        render file: "#{ Rails.root }/src/thumbnails/#{ params[:id] }.png"
    end
end
