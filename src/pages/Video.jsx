import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactPlayer from "react-player";
import TipTapEditor from "../component/TipTapEditor";
import Recommendations from "../component/Recommendations";
import Extras from "../component/Extras";
import "./splitPaneStyles.css";
import "./Video.css";

import { getVideoByID } from "../api/youtube";

import { getQuizByCaption, getSummary, getHelpByCaption, getFlashcards } from "../api/groq";
import SplitPane from "react-split-pane";

const getSubtitles = async (videoId) => {
  const res = await axios.get(`http://localhost:5000/api/subtitles/${videoId}`);
  console.log("Response while fetching subtitles: " + res.data);
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
  const [summary, setSummary] = useState("");
  const [help, setHelp] = useState(null);
  const [flashcards, setFlashcards] = useState(null);
  const [extraActiveIndex, setExtraActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [caption, setCaption] = useState("");
  const [noteTitle, setNoteTitle] = useState("My Note");

  // ---------------Extras Active Index values------------------------
  // 0 -> Summary
  // 1 -> Quiz
  // 2 -> Help
  // 3 -> Flashcards
  // -----------------------------------------------------------------

  async function handleLoadSummary(title, description) {
    setExtraActiveIndex(0);
    try {
      const summaryData = await getSummary(title, description, caption);
      console.log("Generated summary: " + summaryData);
      setSummary(summaryData);
    } catch (e) {
      console.log("Error fetching Summary from AI. " + e.message);
    }
  }

  async function handleLoadQuiz(title, description) {
    setExtraActiveIndex(1);
    try {
      let quizData = await getQuizByCaption(title, description, caption);
      quizData = JSON.parse(quizData);
      setQuiz(quizData);
      console.log(quizData);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleLoadHelp(title, description) {
    setExtraActiveIndex(2);
    setHelp({ title, description, caption });
  }

  async function handleLoadFlashcard(title, description) {
    setExtraActiveIndex(3);
    try {
      let flashcardData = await getFlashcards(title, description, caption);
      // flashcardData = JSON.parse(flashcardData);
      setFlashcards(flashcardData);
      console.log(flashcardData);
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
      setCaption(caption.substring(0, 17000));
    });
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <main>
        <div className="container">
          <div className="content-wrapper">
            <SplitPane
              performanceMode={true}
              style={{ position: "static", marginBottom: "-2.96rem" }}
              split="vertical"
              defaultSize="50%"
            >
              <div className="video-section mt-8 min-w-20">
                <ReactPlayer
                  className="aspect-video rounded-xl overflow-hidden"
                  width="100%"
                  height="100%"
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
                  <input
                    type="text"
                    onChange={(e) => setNoteTitle(e.target.value)}
                    value={noteTitle}
                  ></input>
                  <button className="btn btn-outline">Save</button>
                </div>
                <div className="notes-editor">
                  <TipTapEditor />
                </div>
              </div>
            </SplitPane>
          </div>

          <div className="ai-tools">
            <div
              className="ai-tool-btn mt-4"
              onClick={() =>
                handleLoadSummary(
                  video.snippet.title,
                  video.snippet.description
                )
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
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              <span>AI Summary</span>
            </div>

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

            <div
              className="ai-tool-btn mt-4"
              onClick={() =>
                handleLoadHelp(video.snippet.title, video.snippet.description)
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
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              <span>AI Help</span>
            </div>
            <div
              className="ai-tool-btn mt-4"
              onClick={() =>
                handleLoadFlashcard(video.snippet.title, video.snippet.description)
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
                <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                <path d="M8 2v4"></path>
                <path d="M16 2v4"></path>
                <path d="M2 10h20"></path>
              </svg>
              <span>AI Flash Cards</span>
            </div>
          </div>

          <Extras
            index={extraActiveIndex}
            setIndex={setExtraActiveIndex}
            quiz={quiz}
            summary={summary}
            help={help}
            flashcards={flashcards}
          />
          <Recommendations />
        </div>
      </main>
    </>
  );
}

export default Video;
