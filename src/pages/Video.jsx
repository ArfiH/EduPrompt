import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactPlayer from "react-player";
import TipTapEditor from "../component/TipTapEditor";
import Recommendations from "../component/Recommendations";
import Extras from "../component/Extras";

import "./Video.css";

import {
  getCaptionbyVideoId,
  getCaptionId,
  getVideoByID,
} from "../api/youtube";

import { getQuizBySummary, getQuizByTitle } from "../api/groq";


const getSubtitles = async (videoId) => {
  const res = await axios.get(`http://localhost:5000/api/subtitles/${videoId}`);
  console.log('Response while fetching subtitles: ' + res.data);
  return res.data.subtitles;
};

function getCaptionText(caption) {
  let captionArr = caption.map((item) => item.text);
  return captionArr.join(" ");
}

function Video() {
  const { id } = useParams();
  const [video, setVideo] = useState("");
  const [quiz, setQuiz] = useState([]);
  const [loadQuiz, setLoadQuiz] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [summary, setSummary] = useState("");
  const [noteTitle, setNoteTitle] = useState("My Note");

  async function handleLoadQuiz(title, description) {
    try {
      //   let quizData = [];
      //   setTimeout(() => {
      //     quizData = dummyQuizData;
      //     setQuiz(quizData);
      //     console.log(quizData);
      //     setLoadQuiz(true);
      //   }, 1000);

      // To generate quiz based on only title and description
      //   let quizData = await getQuizByTitle(title, description);
      // console.log(summary);
      let quizData = await getQuizBySummary(title, description, summary);
      quizData = JSON.parse(quizData);
      setQuiz(quizData);
      console.log(quizData);
      setLoadQuiz(true);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getVideoByID(id).then(async (res) => {
      console.log(res);
      setVideo(res);
      setIsLoading(false);

      // get caption id by youtube data api v3
      // const captionIdResponse = await getCaptionId(id);
      // setEnglishCaptionId(captionIdResponse[0].id);
      // console.log(captionIdResponse);

      // get caption by rapidApi youtube transcript api
      // const caption = await getCaptionbyVideoId(id);
      // console.log(typeof caption);

      // const caption = dummyCaption;
      // console.log(typeof caption);

      // get caption from backend api
      const caption = await getSubtitles(id);
      console.log("Fetched Captions:", caption);

      // send only the first 17000 characters to groq otherwise Token per minute exceeded error will be thrown
      setSummary(caption.substring(0, 17000));
    });
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    //   <div className="main-conatiner">
    //     <div className="grid-container grid grid-cols-1 lg:grid-cols-2">
    //       <div className="video-container bg-white rounded-2xl px-8 py-4 m-2">
    //         <ReactPlayer
    //           className="max-w-[640px]"
    //           width="100%"
    //           url={`<https://www.youtube.com/watch?v=${id}>`}
    //           controls
    //         />
    //         <div className="video-description">
    //           <h3 className="font-semibold">{video.snippet.title}</h3>
    //           {/* <p>{video.snippet.description}</p> */}
    //           <p>{video.snippet.channelTitle}</p>
    //           <div className="flex-conatiner flex justify-between items-center">
    //             <p>⏲ {video.contentDetails.duration}</p>
    //             <p>📽 {video.statistics.viewCount}</p>
    //             <p>👍🏻 {video.statistics.likeCount}</p>
    //             <p>♥ {video.statistics.favouriteCount || 0}</p>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="sidebar-container bg-white rounded-2xl px-6 py-4 m-2">
    //         <TipTapEditor />
    //       </div>
    //     </div>

    //     {loadQuiz && quiz && quiz?.length > 0 ? (
    //       <CustomQuiz quiz={quiz} />
    //     ) : (
    //       <button
    //         type="button"
    //         className="m-4 text-primary px-4 py-2 font-bold rounded-2xl bg-accent cursor-pointer"
    //         onClick={() =>
    //           handleLoadQuiz(video.snippet.title, video.snippet.description)
    //         }
    //       >
    //         Load Quiz
    //       </button>
    //     )}
    //   </div>
    // );

    <>
      <main>
        <div className="container">
          <div className="content-wrapper">
            <div className="video-section mt-8">
              <ReactPlayer
                className="max-w-[640px]"
                width="100%"
                url={`<https://www.youtube.com/watch?v=${id}>`}
                controls
              />
              <div className="video-info">
                <h1 className="video-title">{video.snippet.title}</h1>
                <div className="video-meta">
                  <span>{video.statistics.viewCount}</span>
                  <span>•</span>
                  <span>{video.statistics.likeCount} likes</span>
                  <span>•</span>
                  <span>Video by {video.snippet.channelTitle}</span>
                </div>
                <p>{video.snippet.description.slice(0, 160)}...</p>
              </div>
            </div>

            <div className="notes-container mt-8">
              <div className="notes-header">
                <input type="text" onChange={e => setNoteTitle(e.target.value)} value={noteTitle}></input>
                <button className="btn btn-outline">Save</button>
              </div>
              <div className="notes-editor">
                <TipTapEditor />
              </div>
            </div>
          </div>

          <div className="ai-tools">
            <div
              className="ai-tool-btn mt-4"
              onClick={() =>
                handleLoadQuiz(video.snippet.title, video.snippet.description)
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
              <span>AI Quiz</span>
            </div>

            <div className="ai-tool-btn mt-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              <span>AI Summary</span>
            </div>
            <div className="ai-tool-btn mt-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              <span>AI Help</span>
            </div>
            <div className="ai-tool-btn mt-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                <path d="M8 2v4"></path>
                <path d="M16 2v4"></path>
                <path d="M2 10h20"></path>
              </svg>
              <span>AI Flash Cards</span>
            </div>
          </div>

          {loadQuiz && <Extras isQuiz={loadQuiz} quiz={quiz}  />}
          <Recommendations />
        </div>
      </main>
    </>
  );
}

export default Video;
