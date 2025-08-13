"use client";
import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface Question {
  question: string;
  options: string[];
  correct: string; // Stored as 'A', 'B', 'C', etc.
}

interface Quiz {
  _id: string;
  title: string;
  questions: Question[];
}

const quiz = {
  "_id": { "$oid": "66b9f1e5a0a1f20001a1b111" },
  "title": "English Level Test",
  "description": "20-question multiple-choice English grammar and vocabulary test",
  "level": "B1-B2",
  "questions": [
    {
      "question": "She ___ to school by bus every day.",
      "options": ["go", "goes", "going", "gone"],
      "correct": "B",
      "_id": { "$oid": "66b9f1e5a0a1f20001a1b201" }
    },
    {
      "question": "I ___ in this city for ten years.",
      "options": ["live", "lived", "have lived", "living"],
      "correct": "C",
      "_id": { "$oid": "66b9f1e5a0a1f20001a1b202" }
    },
    {
      "question": "We will go out if it ___ tomorrow.",
      "options": ["doesn’t rain", "won’t rain", "didn’t rain", "isn’t raining"],
      "correct": "A",
      "_id": { "$oid": "66b9f1e5a0a1f20001a1b203" }
    },
    {
      "question": "By the time we arrived, they ___ dinner.",
      "options": ["have finished", "finished", "had finished", "were finished"],
      "correct": "C",
      "_id": { "$oid": "66b9f1e5a0a1f20001a1b204" }
    },
    {
      "question": "This is the ___ movie I’ve ever seen.",
      "options": ["good", "better", "best", "most good"],
      "correct": "C",
      "_id": { "$oid": "66b9f1e5a0a1f20001a1b205" }
    },
    {
      "question": "The teacher made the students ___ the homework again.",
      "options": ["do", "doing", "did", "does"],
      "correct": "A",
      "_id": { "$oid": "66b9f1e5a0a1f20001a1b206" }
    },
    {
      "question": "If I ___ more time, I would start a new hobby.",
      "options": ["have", "had", "will have", "having"],
      "correct": "B",
      "_id": { "$oid": "66b9f1e5a0a1f20001a1b207" }
    },
    {
      "question": "There aren’t ___ chairs for everyone.",
      "options": ["much", "many", "some", "a few"],
      "correct": "B",
      "_id": { "$oid": "66b9f1e5a0a1f20001a1b208" }
    },
    {
      "question": "He is interested ___ learning foreign languages.",
      "options": ["in", "at", "on", "for"],
      "correct": "A",
      "_id": { "$oid": "66b9f1e5a0a1f20001a1b209" }
    },
    {
      "question": "They were tired ___ they went to bed early.",
      "options": ["but", "so", "because", "although"],
      "correct": "B",
      "_id": { "$oid": "66b9f1e5a0a1f20001a1b210" }
    },
    {
      "question": "My grandfather is very ___; he always gives me advice and listens to me.",
      "options": ["rude", "wise", "selfish", "noisy"],
      "correct": "B",
      "_id": { "$oid": "66b9f1e5a0a1f20001a1b211" }
    },
    {
      "question": "We decided to ___ a taxi because it was raining heavily.",
      "options": ["take", "ride", "drive", "go"],
      "correct": "A",
      "_id": { "$oid": "66b9f1e5a0a1f20001a1b212" }
    },
    {
      "question": "The weather in this country is very ___.",
      "options": ["unpredictable", "permanent", "usual", "regular"],
      "correct": "A",
      "_id": { "$oid": "66b9f1e5a0a1f20001a1b213" }
    },
    {
      "question": "I can’t ___ to buy that car — it’s too expensive.",
      "options": ["pay", "spend", "afford", "cost"],
      "correct": "C",
      "_id": { "$oid": "66b9f1e5a0a1f20001a1b214" }
    },
    {
      "question": "Please be quiet. The baby is ___.",
      "options": ["sleeping", "asleep", "sleepy", "sleeps"],
      "correct": "B",
      "_id": { "$oid": "66b9f1e5a0a1f20001a1b215" }
    },
    {
      "question": "The opposite of “borrow” is ___.",
      "options": ["lend", "take", "give", "send"],
      "correct": "A",
      "_id": { "$oid": "66b9f1e5a0a1f20001a1b216" }
    },
    {
      "question": "I haven’t seen her ___ last summer.",
      "options": ["since", "for", "from", "by"],
      "correct": "A",
      "_id": { "$oid": "66b9f1e5a0a1f20001a1b217" }
    },
    {
      "question": "This bag is too heavy. Can you help me ___ it?",
      "options": ["carry", "bring", "take", "lift"],
      "correct": "A",
      "_id": { "$oid": "66b9f1e5a0a1f20001a1b218" }
    },
    {
      "question": "We are looking forward ___ you again.",
      "options": ["see", "seeing", "to see", "to seeing"],
      "correct": "D",
      "_id": { "$oid": "66b9f1e5a0a1f20001a1b219" }
    },
    {
      "question": "The test was ___ difficult than I expected.",
      "options": ["much", "more", "most", "many"],
      "correct": "B",
      "_id": { "$oid": "66b9f1e5a0a1f20001a1b220" }
    }
  ],
  "createdAt": { "$date": "2025-08-13T10:00:00.000Z" },
  "updatedAt": { "$date": "2025-08-13T10:00:00.000Z" },
  "__v": 0
}

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
        router.push(`/quiz/${quizId}/results?score=${updatedScore}&total=${totalQuestions}`);
      });
    }
  }, [selectedOption, currentQuestionIndex, score, totalQuestions, currentQuestion, router, quizId, userData]);
  
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
