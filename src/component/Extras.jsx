import React from "react";
import CustomQuiz from "./CustomQuiz";

function Extras({ isQuiz, quiz }) {
  return (
    <div className="bg-white rounded-2xl p-4 m-2">
      {isQuiz && quiz && quiz?.length > 0 && <CustomQuiz quiz={quiz} />}
    </div>
  );
}

export default Extras;
