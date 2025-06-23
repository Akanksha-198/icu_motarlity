// import { NextResponse } from "next/server";
// import connect from "@/utils/db";
// import Patient from "@/models/Patient";
// import mongoose from "mongoose";

// export const POST = async (request: Request) => {
//   try {
//     await connect();
//     if (mongoose.connection.readyState === 1) {
//       console.log("MongoDB is connected");
//     } else {
//       console.log("MongoDB is NOT connected");
//       return new NextResponse("Database not connected", { status: 500 });
//     }

//     const body = await request.json();
//     const patient = await Patient.create(body);

//     return new NextResponse(JSON.stringify(patient), { status: 201 });
//   } catch (err) {
//     console.error("Database Error", err);
//     return new NextResponse("Database Error", { status: 500 });
//   }
// };



import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Patient from "@/models/Patient";
import mongoose from "mongoose";

const parameterLabels = [
  "Albumin", "ALP", "ALT", "AST", "Bilirubin", "BUN", "Cholesterol", "Cereatinine", "DiasABP", "FiO2", "GCS", "Glucose", "HCO3", "HCT", "K", "Lactate", "Magnesium", "MAP", "MechVent", "Na", "NIDiasABP", "NIMAP", "NISystABP", "Platelets", "pH", "RespRate", "SaO2", "SysABP", "Temp", "TropoI", "TropT", "Urine", "WBC", "ICUType"
];

export const POST = async (request: Request) => {
  try {
    await connect();
    if (mongoose.connection.readyState !== 1) {
      return new NextResponse("Database not connected", { status: 500 });
    }

    const body = await request.json();

    // Map numbered keys to schema keys
    const patientData: any = {
      patientname: body.patientname,
      age: Number(body.age),
      gender: body.gender,
      heightcm: Number(body.heightcm),
      weightkg: Number(body.weightkg),
    };

    parameterLabels.forEach((label, i) => {
      const key = (i + 1).toString();
      patientData[label] = body[key] !== undefined ? Number(body[key]) : undefined;
    });

    // Optionally add scores if you want
    // if (body.SOFA) patientData.SOFA = Number(body.SOFA);
    // if (body.SAPS) patientData.SAPS = Number(body.SAPS);
    // if (body.Apache) patientData.Apache = Number(body.Apache);

    const patient = await Patient.create(patientData);

    return new NextResponse(JSON.stringify(patient), { status: 201 });
  } catch (err) {
    console.error("Database Error", err);
    return new NextResponse("Database Error", { status: 500 });
  }
};