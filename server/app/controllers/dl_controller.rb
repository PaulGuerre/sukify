class DlController < ApplicationController
    def dl
        system("youtube-dl -o #{ Rails.root }/src/'%(title)s.%(ext)s' --extract-audio --audio-format mp3 #{ params[:url] }")
    end
end
