"use client";

import { FaExclamationTriangle } from "react-icons/fa";

interface FormDataProps {
  formData: Record<string, string>;
  validationErrors: Record<string, string>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  parameterLabels: string[];
  ageUnit: "years" | "months" | "days";
  setAgeUnit: (unit: "years" | "months" | "days") => void;
}

const FormDataComponent: React.FC<FormDataProps> = ({
  formData,
  validationErrors,
  handleChange,
  parameterLabels,
  ageUnit,
  setAgeUnit,
}) => {
  return (
    <>
      <h2 className="text-4xl font-extrabold mb-10 text-center text-purple-800">
        Patient Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-7 bg-gradient-to-r from-rose-100 via-purple-100 to-green-100 p-8 rounded-2xl shadow-sm">
        {[
          "Patient Name",
          "Age",
          "Gender",
          "Height (cm)",
          "Weight (kg)",
        ].map((label, i) => {
          const name = label.toLowerCase().replace(/[^a-z]/g, "");
          const isNumberField = ["age", "heightcm", "weightkg"].includes(name);

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
                      validationErrors[name]
                        ? "border-red-400"
                        : "border-purple-300"
                    } rounded-xl px-4 py-2.5 text-black text-lg shadow-sm
                      focus:outline-none focus:ring-4 focus:ring-purple-200 transition duration-200 `}
                    required
                  />
                  <select
                    value={ageUnit}
                    onChange={(e) =>
                      setAgeUnit(
                        e.target.value as "years" | "months" | "days"
                      )
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

      <div className="bg-gradient-to-r from-green-100 via-purple-100 to-rose-100 p-8 rounded-2xl shadow-md mt-10">
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
    </>
  );
};

export default FormDataComponent;