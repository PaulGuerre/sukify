import axios from 'axios'

class YoutubeApiManager {
  getVideo (title, YOUTUBE_API_KEY) {
    return axios.get('https://youtube.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        maxResults: 1,
        q: title,
        key: YOUTUBE_API_KEY
      }
    })
  }
}

export default new YoutubeApiManager()
