"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import logo from "@/assets/logo.png";
import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";
import About from "@/components/About";
import Result from "@/components/Result/Result";
import FormDataComponent from "@/components/FormData/FormData";

export default function HomePage() {
  const parameterLabels = [
    "Albumin",
    "ALP",
    "ALT",
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
    ...Object.fromEntries(
      parameterLabels.map((_, i) => [(i + 1).toString(), ""])
    ),
  };

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
  const [ageUnit, setAgeUnit] = useState<"years" | "months" | "days">("years");
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
          (ageUnit === "months" && ageVal > 1800) ||
          (ageUnit === "days" && ageVal > 30)
        ) {
          errorMsg = `Age must be under ${
            ageUnit === "years" ? "150 years" : "1800 months"
          }.`;
        }
      } else if (name === "weightkg") {
        if (value && (+value < 1 || +value > 750)) {
          errorMsg = "Weight must be between 1 and 750 kg.";
        }
      } else if (name === "heightcm") {
        if (value && (+value < 1 || +value > 300)) {
          errorMsg = "Height must be between 1 and 300 cm.";
        }
      } else if (value && (isNaN(+value) || +value < 1 || +value > 200)) {
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
      Apache: Math.floor(Math.random() * 71),
    };
  };

  const scores = showResults ? calculateScores() : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-green-50">
      <nav className="bg-white shadow p-5 flex justify-between items-center sticky top-0 z-50 h-25">
        <div className="flex items-center gap-3 text-purple-700 font-extrabold text-xl cursor-pointer hover:text-green-600 transition">
          <Image
            src={logo}
            alt="Logo"
            width={100}
            height={150}
            className="rounded-full"
          />
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
            <form onSubmit={handleSubmit} className="space-y-12">
              <FormDataComponent
                formData={formData}
                validationErrors={validationErrors}
                handleChange={handleChange}
                parameterLabels={parameterLabels}
                ageUnit={ageUnit}
                setAgeUnit={setAgeUnit}
              />
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
            <Result
              showResults={showResults}
              scores={scores}
              calculatorFields={calculatorFields}
              prediction={prediction}
            />
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

        <section id="about">
          <About />
        </section>
      </main>
    </div>
  );
}
