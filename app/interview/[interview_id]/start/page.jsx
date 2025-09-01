"use client";
import { InterviewDataContext } from "@/context/InterviewDataContext";
import { Loader2Icon, Mic, Phone, Timer } from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import Vapi from "@vapi-ai/web";
import { toast } from "sonner";
import axios from "axios";
import { supabase } from "@/services/supabaseClient";
import { useParams, useRouter } from "next/navigation";

function StartInterview() {
  const { interviewInfo } = useContext(InterviewDataContext);
  const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
  const [activeUser, setActiveUser] = useState(false);
  const [conversation, setConversation] = useState();
  const { interview_id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Timer state
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  // Format time as HH:MM:SS
  const formatTime = (totalSeconds) => {
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  // Start the AI interview call
  const startCall = async() => {
    if (intervalId) clearInterval(intervalId); // prevent multiple intervals

    let questionList = "";
    interviewInfo?.interviewData?.questionList.forEach((item, index) => {
      questionList += item?.question + (index < interviewInfo.interviewData.questionList.length - 1 ? ", " : "");
    });

    const assistantOptions = {
            name: "AI Recruiter",
            firstMessage: "Hi "+ interviewInfo?.userName +", how are you? Ready for your interview on "+ interviewInfo?.interviewData?.jobPosition +"?",
            transcriber: {
                provider: "deepgram",
                model: "nova-2",
                language: "en-US",
            },
            voice: {
                provider: "playht",
                voiceId: "jennifer"
            },
            model: {
                provider: "openai",
                model: "gpt-4",
                messages: [
                    {
                        role: "system",
                        content: `
                            You are an AI Voice assistant conducting interviews. Your job is to ask candidates provided interview
                            questions, assess their responses. Begin the conversation with a friendly introduction, setting a relaxed
                            yet professional tone. Example: "Hey there! Welcome to your ${interviewInfo?.interviewData?.jobPosition} interview. Let's get started
                            with a few questions!" Ask one question at a time and wait for the candidate's response before proceeding.
                            Keep the questions clear and concise. Below are the questions list.
                            Questions: ${questionList}
                            If the candidate struggles, offer hints or rephrase the question without giving away the answer. Example:
                            "Need a hint? Think about how React tracks component updates!"
                            Provide brief, encouraging feedback after each answer. Example:
                            "Nice! That's a solid answer."
                            "Hmm, not quite! Want to try again?"
                            Keep the conversation natural and engaging use casual phrases like "Alright, next up..." or "Let's tackle a tricky one!"
                            "That was great! You handled some tough questions well. Keep sharpening your skills!"
                            End on a positive note:
                            "Thanks for chatting! Hope to see you crushing projects soon!"
                            Key Guidelines:
                            i). Be friendly, engaging, and witty.
                            ii). Keep responses short and natural, like a real conversation.
                            iii). Adapt based on the candidate's confidence level.
                            iv). Ensure the interview remains focused on ${interviewInfo?.interviewData?.jobPosition}.
                        `
                    }
                ]
            }
        };


    await vapi.start(assistantOptions);

    // Start timer
    const id = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);
    setIntervalId(id);
  };

  // Ensure interval is cleared on unmount
  useEffect(() => {
    if (interviewInfo && !intervalId) startCall();
    return () => {
      clearInterval(intervalId);
    };
  }, [interviewInfo]);

  // Stop the interview and generate feedback
  const stopInterview = () => {
    clearInterval(intervalId);
    setLoading(true);
    vapi.stop();
    GenerateFeedback();
  };

  // Vapi event listeners
  useEffect(() => {
    const handleMessage = (message) => {
      if (message?.conversation) {
        setConversation(JSON.stringify(message.conversation));
      }
    };

    vapi.on("message", handleMessage);
    vapi.on("call-start", () => toast("Call Connected..."));
    vapi.on("speech-start", () => setActiveUser(false));
    vapi.on("speech-end", () => setActiveUser(true));
    vapi.on("call-end", () => {
      toast("Interview Ended");
      GenerateFeedback();
    });

    return () => {
      vapi.off("message", handleMessage);
      vapi.off("call-start", () => {});
      vapi.off("speech-start", () => {});
      vapi.off("speech-end", () => {});
    };
  }, []);

  // Generate AI feedback and save to database
  const GenerateFeedback = async () => {
    try {
      const result = await axios.post("/api/ai-feedback", { conversation });
      const Content = result.data.content;
      const FINAL_CONTENT = Content.replace("```json", "").replace("```", "");

      const { error } = await supabase.from("interview-feedback").insert([
        {
          userName: interviewInfo?.userName,
          userEmail: interviewInfo?.userEmail,
          interview_id: interview_id,
          feedback: JSON.parse(FINAL_CONTENT),
          recommended: false,
        },
      ]);

      if (error) toast.error("Failed to save feedback!");

      router.replace("/interview/" + interview_id + "/completed");
      setLoading(false);
    } catch {
      setLoading(false);
      router.replace("/interview/" + interview_id + "/completed");
    }
  };

  return (
    <div className="p-20 lg:px-48 xl:px-56">
      <h2 className="font-bold text-xl flex justify-between">
        AI Interview Session
        <span className="flex gap-2 items-center">
          <Timer />
          {formatTime(secondsElapsed)}
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-5">
        <div className="bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center">
          <div className="relative">
            {!activeUser && <span className="absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping" />}
            <Image src={"/ai.jpg"} alt="ai" width={100} height={100} className="w-[60px] h-[60px] rounded-full object-cover" />
          </div>
          <h2>AI Recruiter</h2>
        </div>

        <div className="bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center">
          <div className="relative">
            {activeUser && <span className="absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping" />}
            <h2 className="text-2xl bg-primary text-white p-3 rounded-full px-5">{interviewInfo?.userName[0]}</h2>
          </div>
          <h2>{interviewInfo?.userName}</h2>
        </div>
      </div>

      <div className="flex items-center gap-5 justify-center mt-7">
        <Mic className="h-12 w-12 p-3 bg-gray-500 text-white rounded-full cursor-pointer" />
        {!loading ? (
          <Phone className="h-12 w-12 p-3 bg-red-500 text-white rounded-full cursor-pointer" onClick={() => stopInterview()} />
        ) : (
          <Loader2Icon className="animate-spin" />
        )}
      </div>

      <h2 className="text-sm text-gray-400 text-center mt-5">Interview in Progress...</h2>
    </div>
  );
}

export default StartInterview;
