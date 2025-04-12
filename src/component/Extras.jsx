import React from "react";
import CustomQuiz from "./ExtraComponents/CustomQuiz";
import Summary from "./ExtraComponents/Summary";

function Extras({ activeIndex, quiz, summary }) {
  return (
    <div className="bg-white rounded-2xl p-4 m-2">
      {(activeIndex === 0 && summary?.length > 0) ? <Summary summary={summary}/> : null}
      {(activeIndex === 1 && quiz?.length > 0) ? <CustomQuiz quiz={quiz} /> : null}
    </div>
  );
}

export default Extras;
