"use client";
import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

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
    level: "B1-B2",
    questions: [
        {
            _id: { $oid: "66b9f1e5a0a1f20001a1b201" },
            question: "You __ wear a helmet when riding a bike.",
            options: ["must", "can", "will", "may", "I don't know"],
            correct: "A",
        },
        {
            _id: { $oid: "66b9f1e5a0a1f20001a1b202" },
            question: "This bag is __ than that one.",
            options: ["heavy", "more heavy", "heavier", "heaviest", "I don't know"],
            correct: "C",
        },
        {
            _id: { $oid: "66b9f1e5a0a1f20001a1b203" },
            question: "If it rains tomorrow, we __ stay home.",
            options: ["will", "would", "can", "might", "I don't know"],
            correct: "A",
        },
        {
            _id: { $oid: "66b9f1e5a0a1f20001a1b204" },
            question: "The letter __ by the postman every day.",
            options: ["delivers", "delivered", "is delivered", "was delivered", "I don't know"],
            correct: "C",
        },
        {
            _id: { $oid: "66b9f1e5a0a1f20001a1b205" },
            question: "She __ speak three languages.",
            options: ["can", "must", "should", "might", "I don't know"],
            correct: "A",
        },
        {
            _id: { $oid: "66b9f1e5a0a1f20001a1b206" },
            question: "Which is __, the red dress or the blue one?",
            options: ["more beautiful", "beautiful", "most beautiful", "beautifuller", "I don't know"],
            correct: "A",
        },
        {
            _id: { $oid: "66b9f1e5a0a1f20001a1b207" },
            question: "I don’t have __ money left.",
            options: ["many", "much", "a lot", "some", "I don't know"],
            correct: "B",
        },
        {
            _id: { $oid: "66b9f1e5a0a1f20001a1b208" },
            question: "We __ eaten dinner when the guests arrived.",
            options: ["already", "have", "has", "had", "I don't know"],
            correct: "D",
        },
        {
            _id: { $oid: "66b9f1e5a0a1f20001a1b209" },
            question: "You should __ more water every day.",
            options: ["drink", "drank", "drinking", "drinks", "I don't know"],
            correct: "A",
        },
        {
            _id: { $oid: "66b9f1e5a0a1f20001a1b210" },
            question: "If I were you, I __ tell her the truth.",
            options: ["will", "would", "can", "might", "I don't know"],
            correct: "B",
        },
        {
            _id: { $oid: "66b9f1e5a0a1f20001a1b211" },
            question: "They __ watching TV when I called.",
            options: ["was", "were", "is", "are", "I don't know"],
            correct: "B",
        },
        {
            _id: { $oid: "66b9f1e5a0a1f20001a1b212" },
            question: "I’ve been living here __ five years.",
            options: ["since", "for", "from", "ago", "I don't know"],
            correct: "B",
        },
        {
            _id: { $oid: "66b9f1e5a0a1f20001a1b213" },
            question: "The cake __ made by my mother.",
            options: ["is", "are", "was", "were", "I don't know"],
            correct: "A",
        },
        {
            _id: { $oid: "66b9f1e5a0a1f20001a1b214" },
            question: "How many __ do you want?",
            options: ["apple", "apples", "appleses", "apple’s", "I don't know"],
            correct: "B",
        },
        {
            _id: { $oid: "66b9f1e5a0a1f20001a1b215" },
            question: "You __ smoke in this area. It’s forbidden.",
            options: ["mustn’t", "can’t", "shouldn’t", "don’t", "I don't know"],
            correct: "A",
        },
        {
            _id: { $oid: "66b9f1e5a0a1f20001a1b216" },
            question: "He said he __ come to the meeting.",
            options: ["will", "would", "can", "must", "I don't know"],
            correct: "B",
        },
        {
            _id: { $oid: "66b9f1e5a0a1f20001a1b217" },
            question: "This is the __ movie I have ever seen.",
            options: ["bad", "worse", "worst", "more bad", "I don't know"],
            correct: "C",
        },
        {
            _id: { $oid: "66b9f1e5a0a1f20001a1b218" },
            question: "They __ finish the work by 5 pm yesterday.",
            options: ["must", "had to", "should", "can", "I don't know"],
            correct: "B",
        },
        {
            _id: { $oid: "66b9f1e5a0a1f20001a1b219" },
            question: "What __ you do if you won the lottery?",
            options: ["will", "would", "can", "must", "I don't know"],
            correct: "B",
        },
        {
            _id: { $oid: "66b9f1e5a0a1f20001a1b220" },
            question: "The windows __ cleaned every week.",
            options: ["is", "are", "be", "was", "I don't know"],
            correct: "B",
        },
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

  const [userData, setUserData] = useState<UserData | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const totalQuestions = quiz.questions.length;
  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = (currentQuestionIndex / totalQuestions) * 100;

  // Ensure user data exists before starting quiz
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

  const handleNext = useCallback(() => {
    if (selectedOption === null) return;

    const correctIndex = currentQuestion.correct.charCodeAt(0) - 65;
    const isCorrect = selectedOption === correctIndex;
    const updatedScore = isCorrect ? score + 1 : score;

    if (currentQuestionIndex < totalQuestions - 1) {
      setScore(updatedScore);
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      if (!userData) return;

      const finalData = { ...userData, score: updatedScore };

      fetch("/api/send-to-telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      }).finally(() => {
        localStorage.removeItem("userData");
        router.push(
          `/quiz/${quizId}/results?score=${updatedScore}&total=${totalQuestions}`
        );
      });
    }
  }, [
    selectedOption,
    currentQuestionIndex,
    score,
    totalQuestions,
    currentQuestion,
    router,
    quizId,
    userData,
  ]);

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
          onClick={handleNext}
          disabled={selectedOption === null}
          className="min-w-[150px]"
        >
          {currentQuestionIndex === totalQuestions - 1
            ? "Finish Quiz"
            : "Next Question"}
        </Button>
      </div>
    </div>
  );
}
