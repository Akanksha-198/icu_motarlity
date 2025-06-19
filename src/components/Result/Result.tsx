"use client";

import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

interface ResultProps {
  showResults: boolean;
  scores: { [key: string]: number } | null;
  calculatorFields: string[];
  prediction: number | null;
}

const Result: React.FC<ResultProps> = ({
  showResults,
  scores,
  calculatorFields,
  prediction,
}) => {
  if (!showResults) return null;

  return (
    <>
      <div className="bg-gradient-to-r from-indigo-100 via-pink-100 to-yellow-100 p-8 rounded-2xl shadow-md mt-8">
        <h3 className="text-2xl font-bold text-purple-700 mb-7 text-center">
          Calculated Scores
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {calculatorFields.map((label, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow-sm text-center transform transition-all duration-300 hover:shadow-md hover:scale-105 cursor-pointer"
            >
              <h4 className="text-lg font-semibold text-purple-600 mb-2">
                {label}
              </h4>
              <p className="text-3xl font-bold text-purple-800">
                {scores ? scores[label as keyof typeof scores] : "N/A"}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                {label === "SOFA" && "Score range: 0-24"}
                {label === "SAPS" && "Score range: 0-163"}
                {label === "Apache" && "Score range: 0-71"}
              </p>
            </div>
          ))}
        </div>
      </div>

      {prediction !== null && (
        <div className="mt-14 bg-white p-10 rounded-3xl shadow-xl text-center animate-fade-in">
          <h3 className="text-4xl font-bold text-green-700 mb-8">
            Prediction Result
          </h3>

          <div className="w-full max-w-3xl mx-auto">
            <div className="flex justify-between px-1 text-sm text-gray-600 font-semibold mb-2">
              <span>0% (Low Survival)</span>
              <span>50%</span>
              <span>100% (High Survival)</span>
            </div>

            <div className="relative h-6 rounded-full overflow-hidden bg-gradient-to-r from-red-500 via-yellow-300 to-green-500 shadow-lg">
              <div
                className="absolute top-0 bottom-0 w-1.5 bg-black rounded-full shadow-md transition-all duration-700 ease-in-out"
                style={{
                  left: `${100 - prediction}%`,
                  transform: "translateX(-50%)",
                }}
              />
            </div>

            <p className="mt-6 text-lg text-gray-700">
              Estimated Survival Chance:
            </p>
            <p
              className={`text-3xl font-extrabold mt-1 ${
                +(100 - prediction).toFixed(2) <= 30
                  ? "text-red-600"
                  : +(100 - prediction).toFixed(2) <= 70
                  ? "text-yellow-500"
                  : "text-green-600"
              }`}
            >
              {+(100 - prediction).toFixed(2)}%
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Result;