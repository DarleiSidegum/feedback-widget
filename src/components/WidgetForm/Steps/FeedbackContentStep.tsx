import { ArrowLeft, Camera } from "phosphor-react";
import { FeedBackType, feedBackTypes } from "..";
import { CloseButton } from "../../CloseButton";
import { FormEvent, useState } from "react";
import { ScreenshotButton } from "../ScreenshotButton";

import { Loading } from "../../Loading";
import { api } from "../../../lib/api";

interface FeedbackContentStepProps {
  feedbackType: FeedBackType;
  onFeedbackRestartRequested: () => void;
  onFeedbackSent: () => void;
}

export function FeedbackContentStep({
  onFeedbackRestartRequested,
  onFeedbackSent,
  feedbackType,
}: FeedbackContentStepProps) {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);

  const feedbackTypeInfo = feedBackTypes[feedbackType];

  async function handleSumbmitFeedback(event: FormEvent) {
    try {
      console.log("aqui");
      event.preventDefault;
      setIsSendingFeedback(true);
      // await api.post("/feedbacks", {
      //   type: feedbackType,
      //   comment,
      //   screenshot,
      // });
      setIsSendingFeedback(false);
      onFeedbackSent();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <header>
        <button
          type="button"
          className="text-zinc-400 hover:text-zinc-100"
          onClick={onFeedbackRestartRequested}
        >
          <ArrowLeft weight="bold" className="top-5 left-5 absolute" />
        </button>
        <span className="text-xl leading-6 flex items-center gap-2">
          <img
            src={feedbackTypeInfo.source}
            alt={feedbackTypeInfo.alt}
            className="w-6 h-6"
          />
          {feedbackTypeInfo.title}
        </span>
        <CloseButton />
      </header>
      <form onSubmit={handleSumbmitFeedback} className="w-full my-4">
        <textarea
          onChange={(event) => setComment(event.target.value)}
          className="min-w-[340px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md 
                focus:border-brand-500 focus:ring-brand-500 focus:ring-1 resize-none focus:outline-none scrollbar scrollbar-thumb-zinc-700
                scrollbar-track-transparent scrollbar-thin"
          placeholder="Conte com detalhes o que está acontecendo..."
        />
        <footer className="flex gap-2 mt-2">
          <ScreenshotButton
            onScreenshotTook={setScreenshot}
            screenshot={screenshot}
          />
          <button
            disabled={comment.length === 0 || isSendingFeedback}
            type="submit"
            className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none
                    focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors
                    disabled:opacity-50 disabled:hover:bg-brand-500"
          >
            {isSendingFeedback ? <Loading /> : "Enviar feedback"}
          </button>
        </footer>
      </form>
    </>
  );
}
