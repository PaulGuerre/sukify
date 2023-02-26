require 'nokogiri'
require 'httparty'
require_relative '../utils'

class YoutubeScraper
    def self.scrapVideoTitle (title)
        page = HTTParty.get('https://www.youtube.com/results?search_query=' + title.gsub(' ', '+').gsub(/[[:^ascii:]]/, ""))
        parsed_page = Nokogiri::HTML(page.body)

        title = parsed_page.to_s[/title":{"runs":\[{"text":"(.*?)"}],"accessibility/m, 1]
        videoId = parsed_page.to_s[/videoId":"(.*?)","thumbnail/m, 1]

        if File.exist?("#{ Rails.root }/musics/#{ Utils.generalizeTitle(title) }.mp3")
            return 'error'
        else
            system("yt-dlp -o #{ Rails.root }/musics/#{ Utils.generalizeTitle(title) }'.%(ext)s' --extract-audio --audio-format mp3 https://www.youtube.com/watch?v=#{ videoId }")
            return title, videoId 
        end
    end
end
