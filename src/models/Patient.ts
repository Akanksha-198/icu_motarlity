import mongoose from "mongoose";
const { Schema } = mongoose;

const patientDataSchema = new Schema(
  {
    patientname: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    heightcm: { type: Number, required: true },
    weightkg: { type: Number, required: true },

    Albumin: Number,
    ALP: Number,
    ALT: Number,
    AST: Number,
    Bilirubin: Number,
    BUN: Number,
    Cholesterol: Number,
    Cereatinine: Number,
    DiasABP: Number,
    FiO2: Number,
    GCS: Number,
    Glucose: Number,
    HCO3: Number,
    HCT: Number,
    K: Number,
    Lactate: Number,
    Magnesium: Number,
    MAP: Number,
    MechVent: Number,
    Na: Number,
    NIDiasABP: Number,
    NIMAP: Number,
    NISystABP: Number,
    Platelets: Number,
    pH: Number,
    RespRate: Number,
    SaO2: Number,
    SysABP: Number,
    Temp: Number,
    TropoI: Number,
    TropT: Number,
    Urine: Number,
    WBC: Number,
    ICUType: Number,

    SOFA: Number,
    SAPS: Number,
    Apache: Number,
  },
  { timestamps: true }
);

export default mongoose.models.PatientData || mongoose.model("PatientData", patientDataSchema);