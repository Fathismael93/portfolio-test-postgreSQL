import connectToDB from "@/database";
import Education from "@/models/Education";
import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import { pool } from "@/utils/dbConnect";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    dbConnect()
    const query = await pool.query('SELECT * FROM education');
    const dataEducation = query.rows;
    await pool.end(() => console.log('Disconnected from POSTGRESQL DB'))

    if (dataEducation) {
      return NextResponse.json({
        success: true,
        data: dataEducation,
      });
    } else {
      console.error("No data found in home table")
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
  }

  /*try {
    await connectToDB();
    const extractData = await Education.find({});

    if (extractData) {
      return NextResponse.json({
        success: true,
        data: extractData,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Something went wrong !Please try again",
      });
    }
  } catch (e) {
    console.log(e);

    return NextResponse.json({
      success: false,
      message: "Something went wrong !Please try again",
    });
  }*/
}