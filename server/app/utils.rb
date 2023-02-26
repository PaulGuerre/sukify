class Utils
    def self.generalizeTitle (title)
        gTitle = title.gsub(/[^a-zA-Z-éèà-]/, '_').gsub(/[ -]/, ' ' => '', '-' => '_').gsub(/(__+)/, '_')
        return gTitle[-1] == '_' ? gTitle[0...-1] : gTitle
    end
end
