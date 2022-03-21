class TestController < ApplicationController
    def play
        render file: "#{ Rails.root }/src/Rick Astley - Never Gonna Give You Up (Official Music Video).mp3"
    end
end
