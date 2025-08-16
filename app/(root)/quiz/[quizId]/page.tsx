"use client";
import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/shared/LoadingButton";

interface Question {
  question: string;
  options: string[];
  correct: string; // Stored as 'A', 'B', 'C', etc.
}

const quiz = {
    _id: { $oid: "66b9f1e5a0a1f20001a1b111" },
    title: "English Level Test",
    description:
        "20-question multiple-choice English grammar and vocabulary test",
    level: "A1-B1",
    questions: [
        {
            _id: { $oid: "66b9f1e5a0a1f20001a1c001" },
            question: "_____ you speak Spanish?",
            options: ["Do", "Are", "Does", "Have", "I don't know (Men bilmayman)"],
            correct: "A",
        },
        {
            _id: { $oid: "66b9f1e5a0a1f20001a1c002" },
            question: "She ___ in a small town.",
            options: ["live", "lives", "living", "is live", "I don't know (Men bilmayman)"],
            correct: "B",
        },
        {
            _id: { $oid: "66b9f1e5a0a1f20001a1c003" },
            question: "We ___ the film last night.",
            options: ["watch", "watched", "watching", "watches", "I don't know (Men bilmayman)"],
            correct: "B",
        },
        {
            _id: { $oid: "66b9f1e5a0a1f20001a1c004" },
            question: "He ___ to school by bus yesterday.",
            options: ["goes", "gone", "went", "going", "I don't know (Men bilmayman)"],
            correct: "C",
        },
        {
            _id: { $oid: "66b9f1e5a0a1f20001a1c005" },
            question: "___ a bank near here?",
            options: ["Are there", "Is there", "There is", "There are", "I don't know (Men bilmayman)"],
            correct: "B",
        },
        {
            _id: { $oid: "66b9f1e5a0a1f20001a1c006" },
            question: "I ___ drive a car.",
            options: ["can", "am", "do", "have", "I don't know (Men bilmayman)"],
            correct: "A",
        },
        {
            _id: { $oid: "66b9f1e5a0a1f20001a1c007" },
            question: "They ___ dinner right now.",
            options: ["has", "have", "are having", "is having", "I don't know (Men bilmayman)"],
            correct: "C",
        },
        {
            _id: { $oid: "66b9f1e5a0a1f20001a1c008" },
            question: "She ___ at home last night.",
            options: ["is", "was", "were", "be", "I don't know (Men bilmayman)"],
            correct: "B",
        },
        {
            _id: { $oid: "66b9f1e5a0a1f20001a1c009" },
            question: "We’re ___ to visit Italy next month.",
            options: ["go", "goes", "going", "gone", "I don't know (Men bilmayman)"],
            correct: "C",
        },
        {
            _id: { $oid: "66b9f1e5a0a1f20001a1c010" },
            question: "I’d ___ some water, please.",
            options: ["want", "like", "liking", "to like", "I don't know (Men bilmayman)"],
            correct: "B",
        },
        {
            _id: { $oid: "66b9f1e5a0a1f20001a1c011" },
            question: "This book is ___ than the other one.",
            options: ["more interesting", "interestinger", "most interesting", "very interesting", "I don't know (Men bilmayman)"],
            correct: "A",
        },
        {
            _id: { $oid: "66b9f1e5a0a1f20001a1c012" },
            question: "It’s the ___ movie I’ve ever seen.",
            options: ["good", "better", "best", "most good", "I don't know (Men bilmayman)"],
            correct: "C",
        },
        {
            _id: { $oid: "66b9f1e5a0a1f20001a1c013" },
            question: "There isn’t ___ coffee left.",
            options: ["some", "any", "a", "an", "I don't know (Men bilmayman)"],
            correct: "B",
        },
        {
            _id: { $oid: "66b9f1e5a0a1f20001a1c014" },
            question: "My birthday is ___ April.",
            options: ["in", "on", "at", "by", "I don't know (Men bilmayman)"],
            correct: "A",
        },
        {
            _id: { $oid: "66b9f1e5a0a1f20001a1c015" },
            question: "That’s my friend. Do you know ___?",
            options: ["she", "her", "hers", "him", "I don't know (Men bilmayman)"],
            correct: "B",
        },
        {
            _id: { $oid: "66b9f1e5a0a1f20001a1c016" },
            question: "I ___ go to the gym on weekends.",
            options: ["always", "go always", "am always", "always go", "I don't know (Men bilmayman)"],
            correct: "A",
        },
        {
            _id: { $oid: "66b9f1e5a0a1f20001a1c017" },
            question: "You ___ eat more vegetables.",
            options: ["must", "should", "can", "will", "I don't know (Men bilmayman)"],
            correct: "B",
        },
        {
            _id: { $oid: "66b9f1e5a0a1f20001a1c018" },
            question: "He’s ___ honest man.",
            options: ["a", "an", "the", "— (no article)", "I don't know (Men bilmayman)"],
            correct: "B",
        },
        {
            _id: { $oid: "66b9f1e5a0a1f20001a1c019" },
            question: "If it rains, we ___ at home.",
            options: ["stay", "will stay", "stays", "staying", "I don't know (Men bilmayman)"],
            correct: "B",
        },
        {
            _id: { $oid: "66b9f1e5a0a1f20001a1c020" },
            question: "Have you ___ been to Paris?",
            options: ["ever", "yet", "already", "just", "I don't know (Men bilmayman)"],
            correct: "A",
        }

    ],
    createdAt: { $date: "2025-08-13T10:00:00.000Z" },
    updatedAt: { $date: "2025-08-13T10:00:00.000Z" },
    __v: 0,
};



type UserData = {
  name: string;
  tel: string;
  school: string;
  score: number;
};

export default function QuizPage() {
  const { quizId } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [userData, setUserData] = useState<UserData | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const totalQuestions = quiz.questions.length;
  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = (currentQuestionIndex / totalQuestions) * 100;


  useEffect(() => {
    if (typeof window === "undefined") return;
    const rawData = localStorage.getItem("userData");
    if (!rawData) {
      router.replace("/");
      return;
    }
    try {
      setUserData(JSON.parse(rawData));
    } catch {
      router.replace("/");
    }
  }, [router]);

    const handleButtonClick = async () => {
        setLoading(true);

        // Simulate delay so user sees loading
        await new Promise((resolve) => setTimeout(resolve, 300));

        const correctIndex = currentQuestion.correct.charCodeAt(0) - 65;
        const isCorrect = selectedOption === correctIndex;
        const updatedScore = isCorrect ? score + 1 : score;

        if (currentQuestionIndex < totalQuestions - 1) {
            // Go to next question
            setScore(updatedScore);
            setCurrentQuestionIndex((prev) => prev + 1);
            setSelectedOption(null);
            setLoading(false);
        } else {
            // Last question → send results
            if (!userData) return;
            const finalData = { ...userData, score: updatedScore };

            await fetch("/api/send-to-telegram", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(finalData),
            });

            localStorage.removeItem("userData");
            router.push(
                `/quiz/${quizId}/results?score=${updatedScore}&total=${totalQuestions}`
            );
        }
    };


  if (!userData) return null; // Prevent render until data is loaded

  return (
    <div className="container mx-auto py-8 max-w-2xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </h2>
        {/* <div className={`px-3 py-1 rounded-full text-sm ${
          timeLeft <= 10 ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
        }`}>
          {timeLeft}s
        </div> */}
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div
          className="bg-blue-600 h-2 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {currentQuestion && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-medium mb-4">
            {currentQuestion.question}
          </h3>
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                className={`w-full text-left p-3 rounded-md border transition-colors ${
                  selectedOption === index
                    ? "bg-blue-50 border-blue-500"
                    : "hover:bg-gray-50 border-gray-200"
                }`}
                onClick={() => setSelectedOption(index)}
              >
                {`${String.fromCharCode(65 + index)}. ${option}`}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-end">
          <Button
              onClick={handleButtonClick}
              disabled={selectedOption === null || loading}
              className="min-w-[150px]"
          >
              {loading
                  ? <LoadingButton/>
                  : currentQuestionIndex === totalQuestions - 1
                      ? "Testni Tugatish"
                      : "Keyingi Savol"}
          </Button>

      </div>
    </div>
  );
}
