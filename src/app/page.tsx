"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import logo from "@/assets/logo.png";
import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";

export default function HomePage() {
  const parameterLabels = ["Albumin","ALP", "ALT",
    "AST",
    "Bilirubin",
    "BUN",
    "Cholesterol",
    "Cereatinine",
    "DiasABP",
    "FiO2",
    "GCS",
    "Glucose",
    "HCO3",
    "HCT",
    "K",
    "Lactate",
    "Magnesium",
    "MAP",
    "MechVent",
    "Na",
    "NIDiasABP",
    "NIMAP",
    "NISystABP",
    "Platelets",
    "pH",
    "RespRate",
    "SaO2",
    "SysABP",
    "Temp",
    "TropoI",
    "TropT",
    "Urine",
    "WBC",
    "ICUType",
  ];
  const calculatorFields = ["SOFA", "SAPS", "Apache"];

  const patientInfoFields = [
    "patientname",
    "age",
    "gender",
    "heightcm",
    "weightkg",
  ];
  
  const initialFormData = {
    patientname: "",
    age: "",
    gender: "",
    heightcm: "",
    weightkg: "",
    ...Object.fromEntries(parameterLabels.map((_, i) => [(i + 1).toString(), ""]))
  }
  
  const allFormKeys = [
    ...patientInfoFields,
    ...parameterLabels.map((_, i) => (i + 1).toString()),
  ];

  const [formData, setFormData] = useState<Record<string, string>>(
    Object.fromEntries(allFormKeys.map((key) => [key, ""]))
  );

  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const [prediction, setPrediction] = useState<number | null>(null);
  const [ageUnit, setAgeUnit] = useState<"years" | "months"|"days">("years");
  const [showResults, setShowResults] = useState(false);

  const handleReset = () => {
    const resetForm = Object.fromEntries(allFormKeys.map((key) => [key, ""]));
    setFormData(resetForm);
    setValidationErrors({});
    setAgeUnit("years");
    setPrediction(null);
    setShowResults(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    let errorMsg = "";
    let processedValue = value;

    if (name === "patientname") {
      if (value.length === 1) {
        processedValue = value.toUpperCase();
      } else if (value.length > 1 && !validationErrors[name]) {
        processedValue = value.charAt(0).toUpperCase() + value.slice(1);
      }

      if (!/^[A-Z][a-zA-Z ]*$/.test(processedValue)) {
        errorMsg = "Name must contain only alphabets and spaces.";
        processedValue = value;
      }
    }
    const numericFields = [
      "age",
      "heightcm",
      "weightkg",
      ...parameterLabels.map((_, i) => (i + 1).toString()),
    ];

    if (numericFields.includes(name)) {
      if (name === "age") {
        const ageVal = parseFloat(value);
        if (isNaN(ageVal) || ageVal < 0.01) {
          errorMsg = "Age must be at least 1 day.";
        } else if (
          (ageUnit === "years" && ageVal > 150) ||
          (ageUnit === "months" && ageVal > 1800)||
          (ageUnit === "days" && ageVal > 30)
        ) {
          errorMsg = `Age must be under ${
            ageUnit === "years" ? "150 years" : "1800 months"
          }.`;
        }
      }
      else if (name === "weightkg") {
        if (value && (+value < 1 || +value > 750)) {
          errorMsg = "Weight must be between 1 and 750 kg.";
        }
      }
      else if (name === "heightcm") {
        if (value && (+value < 1 || +value > 300)) {
          errorMsg = "Height must be between 1 and 300 cm.";
        }
      }       
      else if (value && (isNaN(+value) || +value < 1 || +value > 200)) {
        errorMsg = "Value must be between 1 and 200.";
      }
    }

    setFormData({ ...formData, [name]: processedValue });
    setValidationErrors({ ...validationErrors, [name]: errorMsg });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const hasErrors = Object.values(validationErrors).some((error) => error);
    if (hasErrors) {
      return;
    }

    const emptyFields = allFormKeys.filter((key) => !formData[key]);
    if (emptyFields.length > 0) {
      return;
    }

    const fakePrediction = Math.random() * 100;
    setPrediction(Number(fakePrediction.toFixed(2)));
    setShowResults(true);
  };

  const calculateScores = () => {
    return {
      SOFA: Math.floor(Math.random() * 24), 
      SAPS: Math.floor(Math.random() * 163), 
      Apache: Math.floor(Math.random() * 71) 
    };
  };

  const scores = showResults ? calculateScores() : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-green-50">
      <nav className="bg-white shadow p-5 flex justify-between items-center sticky top-0 z-50 h-25">
        <div className="flex items-center gap-3 text-purple-700 font-extrabold text-xl cursor-pointer hover:text-green-600 transition">
          <Image src={logo} alt="Logo" width={100} height={150} className="rounded-full" />
        </div>
        <div className="space-x-6">
          <Link
            href="#about"
            className="text-purple-700 border-2 border-purple-400 px-5 py-2 rounded-full font-semibold shadow-sm hover:bg-purple-100 hover:text-purple-900 hover:shadow-md transition duration-300 ease-in-out transform hover:scale-105"
          >
            About
          </Link>
        </div>
      </nav>

      <main className="p-8 max-w-6xl mx-auto">
        <div>
          <section className="bg-white shadow-lg p-10 rounded-3xl hover:shadow-xl transition duration-300">
            <h2 className="text-4xl font-extrabold mb-10 text-center text-purple-800">
              Patient Information
            </h2>
            <form onSubmit={handleSubmit} className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-7 bg-gradient-to-r from-rose-100 via-purple-100 to-green-100 p-8 rounded-2xl shadow-sm">
                {[
                  "Patient Name",
                  "Age",
                  "Gender",
                  "Height (cm)",
                  "Weight (kg)",
                ].map((label, i) => {
                  const name = label.toLowerCase().replace(/[^a-z]/g, "");
                  const isNumberField = [
                    "age",
                    "heightcm",
                    "weightkg",
                  ].includes(name);

                  if (label === "Age") {
                    return (
                      <div key={i}>
                        <label className="block text-base font-semibold text-purple-700 mb-2 text-center">
                          {label}
                        </label>
                        <div className="flex gap-1 items-center">
                          <input
                            type="number"
                            name={name}
                            step="any"
                            value={formData[name]}
                            onChange={handleChange}
                            placeholder="Age"
                            className={`w-full border ${
                              validationErrors[name] ? "border-red-400" : "border-purple-300"
                            } rounded-xl px-4 py-2.5 text-black text-lg shadow-sm
                              focus:outline-none focus:ring-4 focus:ring-purple-200 transition duration-200 `}
                            required
                          />
                          <select
                            value={ageUnit}
                            onChange={(e) =>
                              setAgeUnit(e.target.value as "years" | "months" | "days")
                            }
                            className="border border-purple-300 rounded-xl px-1 py-2 text-sm text-purple-800 bg-white shadow-sm
                              focus:outline-none focus:ring-2 focus:ring-purple-200 transition duration-200 h-12"
                          >
                            <option value="years">Years</option>
                            <option value="months">Months</option>
                            <option value="days">Days</option>
                          </select>
                        </div>

                        {validationErrors[name] && (
                          <div className="mt-2 flex items-center gap-2 text-sm text-red-700 bg-red-50 px-3 py-2 rounded-lg border border-red-200 animate-fade-in">
                            <FaExclamationTriangle className="text-red-500 flex-shrink-0" />
                            <span>{validationErrors[name]}</span>
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <div key={i}>
                      <label className="block text-base font-semibold text-purple-700 mb-2 text-center">
                        {label}
                      </label>
                      {label === "Gender" ? (
                        <select
                          name={name}
                          value={formData[name]}
                          onChange={handleChange}
                          className="block w-full border border-purple-300 rounded-xl p-3 text-black text-lg shadow-sm
                            focus:outline-none focus:ring-4 focus:ring-purple-200 transition"
                          required
                        >
                          <option value="">Select</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="transgender">Transgender</option>
                        </select>
                      ) : (
                        <input
                          type={isNumberField ? "number" : "text"}
                          name={name}
                          step="0.01"
                          value={formData[name] || ""}
                          onChange={handleChange}
                          min={isNumberField ? "1" : undefined}
                          className={`block w-full border ${
                            validationErrors[name]
                              ? "border-red-400"
                              : "border-purple-300"
                          } rounded-xl p-3 text-black text-lg shadow-sm
                            focus:outline-none focus:ring-4 focus:ring-purple-200 transition`}
                          required
                        />
                      )}
                      {validationErrors[name] && (
                        <div className="mt-2 flex items-center gap-2 text-sm text-red-700 bg-red-50 px-3 py-2 rounded-lg border border-red-200 animate-fade-in">
                          <FaExclamationTriangle className="text-red-500 flex-shrink-0" />
                          <span>{validationErrors[name]}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="bg-gradient-to-r from-green-100 via-purple-100 to-rose-100 p-8 rounded-2xl shadow-md">
                <h3 className="text-2xl font-bold text-purple-700 mb-7 text-center">
                  Clinical Parameters
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {parameterLabels.map((label, i) => {
                    const name = (i + 1).toString();
                    return (
                      <div key={i}>
                        <label className="block text-sm font-semibold text-purple-600 mb-1 text-center">
                          {label}
                        </label>
                        <input
                          type="number"
                          step="any"
                          min="1"
                          name={name}
                          value={formData[name]}
                          onChange={handleChange}
                          placeholder="Enter value"
                          className={`block w-full border ${
                            validationErrors[name]
                              ? "border-red-400"
                              : "border-purple-300"
                          } rounded-xl p-2.5 text-black text-base
                            shadow-sm focus:outline-none focus:ring-4 focus:ring-purple-200 transition`}
                          required
                        />
                        {validationErrors[name] && (
                          <div className="mt-2 flex items-center gap-2 text-sm text-red-700 bg-red-50 px-3 py-2 rounded-lg border border-red-200 animate-fade-in">
                            <FaExclamationTriangle className="text-red-500 flex-shrink-0" />
                            <span>{validationErrors[name]}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex justify-center ">
                <button
                  type="submit"
                  className="bg-purple-600 text-white px-14 py-3 rounded-3xl shadow-lg
                    hover:bg-purple-700 hover:shadow-xl transition duration-300 font-bold text-xl"
                >
                  Submit
                </button>
              </div>
              <div className="flex justify-center mt-4">
                <button
                  type="button"
                  onClick={handleReset}
                  className="bg-red-500 text-white px-10 py-2 rounded-full shadow-md
                    hover:bg-red-600 transition duration-300 font-semibold text-lg"
                >
                  Reset
                </button>
              </div>
            </form>

            {showResults && (
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
            )}
          </section>
        </div>

        <div className="text-center mt-10">
          <button
            className="bg-green-400 text-white px-12 py-3 rounded-3xl shadow-lg
              hover:bg-green-500 hover:shadow-xl transition duration-300 text-xl font-semibold"
          >
            Print PDF
          </button>
        </div>

        <section
          id="about"
          className="mt-16 bg-white p-10 rounded-3xl shadow-lg max-w-5xl mx-auto hover:shadow-xl transition duration-300"
        >
          <h2 className="text-3xl font-bold mb-4 text-purple-800">About</h2>
          <p className="text-purple-700 leading-relaxed text-lg">
            This is an ICU assistant system that estimates mortality risk using
            34 critical clinical parameters. Designed for medical professionals,
            this tool helps in decision-making with the power of ML.
          </p>
        </section>
      </main>
    </div>
  );
}
