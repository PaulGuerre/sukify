require_relative './youtube_scraper'
require_relative '../utils'

class MusicsController < ApplicationController
    use MiddlewareManager

    def index
        musics = Music.all
        render json: musics
    end

    def show
        music = Music.find(params[:id])
        render json: music
    end

    def play
        music = Music.find(params[:id])
        render file: "#{ Rails.root }/musics/#{ Utils.generalizeTitle(music.title) }.mp3"
    end

    def videoID
        music = Music.find(params[:id])
        render json: { videoID: music.videoID }
    end

    def add
        page = HTTParty.get('https://www.youtube.com/results?search_query=' + params[:title].gsub(' ', '+').gsub(/[[:^ascii:]]/, ""))
        parsed_page = Nokogiri::HTML(page.body)

        title = parsed_page.to_s[/title":{"runs":\[{"text":"(.*?)"}],"accessibility/m, 1]
        videoId = parsed_page.to_s[/videoId":"(.*?)","thumbnail/m, 1]
        gTitle = Utils.generalizeTitle(title)

        if File.exist?("#{ Rails.root }/musics/#{ gTitle }.mp3")
            render json: { success: false, message: 'Music already exists' }
            exit
        else
            puts "DICK"
            system("yt-dlp -o #{ Rails.root }/musics/#{ gTitle }'.%(ext)s' --extract-audio --audio-format mp3 https://www.youtube.com/watch?v=#{ videoId }")
        end

        if !File.exist?("#{ Rails.root }/musics/#{ gTitle }.mp3")
            render json: { success: false, message: 'Error on downloading' }
            exit
        end

        music = Music.new(title: title, videoID: videoId)
        puts music

        if music.save
            render json: { success: true, message: 'Successfully downloaded' }
        else
            music.delete
            File.delete("#{ Rails.root }/musics/#{ gTitle }.mp3")
            render json: { success: false, message: 'Error on downloading' }
        end
    end

    def delete
        playlistMusics = PlaylistMusic.where(music_id: params[:id])
        music = Music.find(params[:id])
        title = Utils.generalizeTitle(music.title)
        if File.exist?("#{ Rails.root }/musics/#{ title }.mp3")
            File.delete("#{ Rails.root }/musics/#{ title }.mp3")
        end

        if playlistMusics.delete_all && music.delete && !File.exist?("#{ Rails.root }/musics/#{ title }.mp3")
            render json: { message: 'Music successfully deleted' }
        else
            render json: { message: 'Error while deleting' }
        end
    end
end
