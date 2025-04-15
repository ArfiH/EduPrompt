import React, {useState} from "react";
import CustomQuiz from "./ExtraComponents/CustomQuiz";
import Summary from "./ExtraComponents/Summary";
import GroqChat from "./ExtraComponents/GroqChat";

function Extras({ index, setIndex, quiz, summary, help}) {
  
  return (
    <div className="extras-container mt-8 relative">
      <ul className="flex border-b">
        <li className="-mb-px border-0">
          <button
            className={
              index === 0
                ? "bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold rounded-tl-xl"
                : "bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold cursor-pointer rounded-tl-xl"
            }
            onClick={() => setIndex(0)}
          >
            Summary
          </button>
        </li>
        <li className="border-0">
          <button
            className={
              index === 1
                ? "bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold"
                : "bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold cursor-pointer"
            }
            onClick={() => setIndex(1)}
          >
            Quiz
          </button>
        </li>
        <li className="border-0">
          <button
            className={
              index === 2
                ? "bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold"
                : "bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold cursor-pointer"
            }
            onClick={() => setIndex(2)}
          >
            Help
          </button>
        </li>
        <li className="border-0">
          <button
            className={
              index === 3
                ? "bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold rounded-tr-xl"
                : "bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold cursor-pointer rounded-tr-xl"
            }
            onClick={() => setIndex(3)}
          >
            Flashcard
          </button>
        </li>
      </ul>

      <div className="bg-white p-4">
        {index === 0 && summary?.length > 0 ? (
          <Summary summary={summary} />
        ) : null}
        {index === 1 && quiz?.length > 0 ? (
          <CustomQuiz quiz={quiz} />
        ) : null}
        {index === 2 ? (
          <GroqChat help={help} />
        ) : null}
      </div>
    </div>
  );
}

export default Extras;
