"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ResultsPage() {
  const router = useRouter();
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(1);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const scoreParam = Number(params.get("score") || "0");
    const totalParam = Number(params.get("total") || "1");

    if (isNaN(scoreParam) || isNaN(totalParam) || totalParam <= 0) {
      router.replace("/quiz");
      return;
    }

    setScore(scoreParam);
    setTotal(totalParam);
  }, [router]);

  const percentage = Math.round((score / total) * 100);
  const resultMessage =
    percentage >= 90
      ? "Advanced (C1/C2)"
      : percentage >= 70
      ? "Upper-Intermediate (B2)"
      : percentage >= 50
      ? "Intermediate (B1)"
      : percentage >= 30
      ? "Pre-Intermediate (A2)"
      : "Beginner / Elementary (A1)";

  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || sent) return;

    const rawData = localStorage.getItem("userData");
    if (!rawData) return;

    try {
      const storedData = JSON.parse(rawData);
      const finalData = { ...storedData, score };

      fetch("/api/send-to-telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      }).then(() => {
        localStorage.removeItem("userData");
        setSent(true);
      });
    } catch {
      console.error("Failed to parse user data");
    }
  }, [score, sent]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 max-w-md">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Quiz Results</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-5xl font-bold mb-6">
              {score}/{total}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
              <div
                className={`h-4 rounded-full ${
                  percentage >= 70
                    ? "bg-green-500"
                    : percentage >= 50
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
                style={{ width: `${percentage}%` }}
              />
            </div>
            <p className="text-lg mb-6">{resultMessage}</p>

            <Link href={"/"}>
              <Button className="text-md bg-blue-900">
                RETURN TO MAIN PAGE
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
