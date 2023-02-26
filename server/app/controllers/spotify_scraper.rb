require 'nokogiri'
require 'httparty'
require_relative './youtube_scraper'

class SpotifyScraper
    def self.scrapPlaylistVideoList (url)
        page = HTTParty.get(url)
        parsed_page = Nokogiri::HTML(page.body)
        
        titles = Array.new
        videoIds = Array.new

        parsed_page.css('a').each do |track|
            if track.to_s.include? 'track'
                title, videoId = YoutubeScraper.scrapVideoTitle(track.content)
                titles.push(title)
                videoIds.push(videoId)
            end
        end

       return parsed_page.css('h1').text, titles, videoIds
    end
end
