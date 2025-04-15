import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { getVideos } from "../api/youtube";
import Card from "../component/Card";
import { Search } from "lucide-react";
import homePageSVG from '../home-page-svg.svg'
import SearchBar from "../component/SearchBar";

function Home() {
  const { query } = useParams();
  const [videoList, setVideoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(query || "");
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [featuredVideo, setFeaturedVideo] = useState(null);

  useEffect(() => {
    getVideos(searchQuery || "Reactjs videos" ).then((res) => {
      setVideoList(res);
      setFilteredVideos(res);
      
      // Set the first video as featured if available
      if (res && res.length > 0) {
        setFeaturedVideo(res[0]);
      }
      
      setIsLoading(false);
    });
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    if (query.trim() === "") {
      setFilteredVideos(videoList);
    } else {
      const filtered = videoList.filter(
        (video) => 
          video.snippet?.title?.toLowerCase().includes(query) || 
          video.snippet?.description?.toLowerCase().includes(query)
      );
      setFilteredVideos(filtered);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover the Joy of Learning</h1>
              <p className="text-xl mb-8 text-blue-100">
                Explore thousands of educational videos from top instructors around the world.
                Learn at your own pace and expand your knowledge.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-white text-blue-700 hover:bg-blue-50 font-medium py-3 px-6 rounded-lg transition duration-300">
                  Browse Courses
                </button>
                <button className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-700 font-medium py-3 px-6 rounded-lg transition duration-300">
                  Browse Notes
                </button>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src={homePageSVG ||"/api/placeholder/600/400"}
                alt="Student learning online" 
                className="rounded-lg shadow-lg" 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="container mx-auto px-4 md:px-8 py-8">
        <SearchBar /> 
        
        {/* <div className="bg-white p-6 rounded-xl shadow-md -mt-8 md:-mt-12 mb-8 max-w-3xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for educational videos..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full py-4 pl-12 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div> */}

        {/* Change it to last viewed video and write continue where you left */}
        {/* Featured Video Section (shows only if there's a featured video) */}
        {featuredVideo && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Featured Content</h2>
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="md:flex">
                <div className="md:w-2/3">
                  <div className="bg-gray-700 aspect-video">
                    {/* Featured video thumbnail */}
                    <img 
                      src={featuredVideo.snippet?.thumbnails?.high?.url || "/api/placeholder/800/450"} 
                      alt={featuredVideo.snippet?.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="p-6 md:w-1/3">
                  <h3 className="text-xl font-bold mb-3 text-gray-800">
                    {featuredVideo.snippet?.title || "Featured Educational Video"}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {featuredVideo.snippet?.description?.substring(0, 150) || 
                    "Learn from the best instructors and expand your knowledge with our carefully curated educational content."}
                    {featuredVideo.snippet?.description?.length > 150 ? "..." : ""}
                  </p>
                  <div className="flex items-center mb-4">
                    {/* Add channel avatar her
                    <div className="w-8 h-8 rounded-full bg-gray-300 mr-3"></div> */}

                    <span className="text-sm text-gray-700">
                      By {featuredVideo.snippet?.channelTitle || "Expert Instructor"}
                    </span>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300">
                  <a href={`/video/${featuredVideo.id.videoId}`}>Watch Now</a>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Categories Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Browse Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {["Mathematics", "Science", "Programming", "Languages", "Arts", "History"].map((category) => (
              <div 
                key={category} 
                className="bg-white rounded-lg p-4 text-center shadow-md hover:shadow-lg cursor-pointer transition duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 text-lg font-bold">{category.charAt(0)}</span>
                </div>
                <h3 className="font-medium text-gray-800">{category}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;