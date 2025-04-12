import axios from "axios";

const VITE_YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const VITE_YOUTUBE_API_KEY2 = import.meta.env.VITE_YOUTUBE_API_KEY2;
const apiKeys = [VITE_YOUTUBE_API_KEY, VITE_YOUTUBE_API_KEY2];
const BASE_URL = "https://www.googleapis.com/youtube/v3";
let currKey = 0;

const getVideos = async (searchQuery) => {
  const newKey = apiKeys[currKey++ % apiKeys.length];
  const res = await axios.get(`${BASE_URL}/search`, {
    params: {
      part: "snippet",
      maxResults: 25,
      q: searchQuery,
      type: "video",
      videoCategoryId: "27", // Category 27 is for education
      key: newKey,
    },
  });
  const videoList = await res.data.items;
  console.log(videoList);
  return videoList;
};

// https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=Ks-_Mh1QhMc&key=[YOUR_API_KEY]
const getVideoByID = async (id) => {
  const newKey = apiKeys[currKey++ % apiKeys.length];
  const res = await axios.get(`${BASE_URL}/videos`, {
    params: {
      part: "snippet, contentDetails, statistics",
      id: id,
      key: newKey,
    },
  });
  return res.data.items[0];
};

const getCaptionId = async (videoId) => {
  const newKey = apiKeys[currKey++ % apiKeys.length];
  const res = await axios.get(`${BASE_URL}/captions`, {
    params: {
      part: "id, snippet",
      videoId: videoId,
      key: newKey,
    },
  });
  const allCaptionsId = res.data.items;
  console.log(allCaptionsId);
  const englishCaptionId = allCaptionsId.filter(
    (item) => item.snippet.language === "en"
  );
  console.log(englishCaptionId);
  return englishCaptionId;
};

const getCaptionbyVideoId = async (videoId) => {
  const options = {
    method: "GET",
    url: "https://youtube-transcript3.p.rapidapi.com/api/transcript",
    params: {
      videoId: videoId,
    },
    headers: {
      "x-rapidapi-key": "255f9920c2msh89ddfc9c47b3409p102cd7jsn36aac328a025",
      "x-rapidapi-host": "youtube-transcript3.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);

    // return flattened transcript array
    return response.data.transcript.flat(4);
  } catch (error) {
    console.error(error);
  }
};

export { getVideos, getVideoByID, getCaptionId, getCaptionbyVideoId };
