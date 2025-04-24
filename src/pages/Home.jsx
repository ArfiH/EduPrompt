import React, { useEffect, useState } from "react";
import homePageSVG from '../home-page-svg.svg'
// import homePageSVG from '../student_jumping.svg'
import SearchBar from "../component/SearchBar";

function Home() {

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
                  See Watch History
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
        
        {/* Recently saved notes Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Browse Notes</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {["Mathematics", "Science", "Programming", "Languages", "Arts", "History"].map((note) => (
              <div 
                key={note} 
                className="bg-white rounded-lg p-4 text-center shadow-md hover:shadow-lg cursor-pointer transition duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 text-lg font-bold">{note.charAt(0)}</span>
                </div>
                <h3 className="font-medium text-gray-800">{note}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Recently watched videos Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Watch History</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {["Mathematics", "Science", "Programming", "Languages", "Arts", "History"].map((vid) => (
              <div 
                key={vid} 
                className="bg-white rounded-lg p-4 text-center shadow-md hover:shadow-lg cursor-pointer transition duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 text-lg font-bold">{vid.charAt(0)}</span>
                </div>
                <h3 className="font-medium text-gray-800">{vid}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;