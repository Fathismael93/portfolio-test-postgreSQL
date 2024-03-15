import connectToDB from "@/database";
import Education from "@/models/Education";
import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import { pool } from "@/utils/dbConnect";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    dbConnect()
    const extractData = await req.json();
    const { degree, year, college } = extractData;

    const newEducation = await pool.query('INSERT INTO education (degree, year, college) VALUES ($1, $2, $3) RETURNING *',
                                    [degree, year, college])

    if (newEducation.rows[0]) {
      return NextResponse.json({
        success: true,
        message: "Data saved successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Something goes wrong !Please try again",
      });
    }

    await pool.end()
    
  } catch (e) {
    console.log(e);

    return NextResponse.json({
      success: false,
      message: "Something goes wrong !Please try again",
    });
  }

  /*try {
    await connectToDB();
    const extractData = await req.json();
    const saveData = await Education.create(extractData);

    if (saveData) {
      return NextResponse.json({
        success: true,
        message: "Data saved successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Something goes wrong !Please try again",
      });
    }
  } catch (e) {
    console.log(e);

    return NextResponse.json({
      success: false,
      message: "Something goes wrong !Please try again",
    });
  }*/
}