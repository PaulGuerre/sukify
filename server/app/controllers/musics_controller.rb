class MusicsController < ApplicationController
    use MiddlewareManager

    def youtubeApiKey
        render json: { message: 'success', youtubeApiKey: ENV["YOUTUBE_API_KEY"] }
    end

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
        render file: "#{ Rails.root }/src/#{ generalizeTitle(music.title) }.mp3"
    end

    def videoID
        music = Music.find(params[:id])
        render json: { videoID: music.videoID }
    end

    def add
        if File.exist?("#{ Rails.root }/src/#{ generalizeTitle(params[:title]) }.mp3")
            render json: { message: 'error' }
        else
            music = Music.new(title: params[:title], videoID: params[:videoID])
            if music.save
                system("yt-dlp -o #{ Rails.root }/src/#{ generalizeTitle(music.title) }'.%(ext)s' --extract-audio --audio-format mp3 https://www.youtube.com/watch?v=#{ params[:videoID] }")
                if File.exist?("#{ Rails.root }/src/#{ generalizeTitle(music.title) }.mp3")
                    render json: { message: 'success' }
                else 
                    music.delete
                    render json: { message: 'error' }
                end
            else
                render json: { message: 'error' }
            end
        end
    end

    def delete
        playlistMusics = PlaylistMusic.where(music_id: params[:id])
        music = Music.find(params[:id])
        if File.exist?("#{ Rails.root }/src/#{ generalizeTitle(music.title) }.mp3")
            File.delete("#{ Rails.root }/src/#{ generalizeTitle(music.title)}.mp3")
        end

        if playlistMusics.delete_all && music.delete && !File.exist?("#{ Rails.root }/src/#{ generalizeTitle(music.title) }.mp3")
            render json: { message: 'success' }
        else
            render json: { message: 'error' }
        end
    end

    def update
        music = Music.find(params[:id])
        music.update(title: params[:title], videoID: params[:videoID])
        if music.save
            render json: { message: 'success' }
        else 
            render json: { message: 'error' }
        end
    end

    def generalizeTitle (title)
        gTitle = title.gsub(/[^a-zA-Z-éèà-]/, '_').gsub(/[ -]/, ' ' => '', '-' => '_').gsub(/(__+)/, '_')
        return gTitle[-1] == '_' ? gTitle[0...-1] : gTitle
    end
end
