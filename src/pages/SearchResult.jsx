import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getVideos } from "../api/youtube";
import Card from "../component/Card";

function SearchResult() {
  const { query } = useParams();
  const [videoList, setVideoList] = useState([]);

  const [searchQuery, setSearchQuery] = useState(query || "");
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [featuredVideo, setFeaturedVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getVideos(searchQuery || "Reactjs videos").then((res) => {
      setVideoList(res);
      setFilteredVideos(res);

      // Set the first video as featured if available
      if (res && res.length > 0) {
        setFeaturedVideo(res[0]);
      }

      setIsLoading(false);
    });
  }, []);

  return (
    <div className="search-result-container">
      {/* Video Grid Section */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Recommended Videos
          </h2>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredVideos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredVideos.map((vid) => (
              <Card key={vid.etag} video={vid} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              No videos found
            </h3>
            <p className="text-gray-500">
              Try different search terms or browse our categories
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchResult;
