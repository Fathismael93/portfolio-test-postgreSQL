import connectToDB from "@/database";
import Home from "@/models/Home";
import { NextResponse } from "next/server";
import { pool } from "@/utils/dbConnect";
import dbConnect from "@/utils/dbConnect";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    dbConnect()
    const query = await pool.query('SELECT * FROM home');
    const dataHome = query.rows;
    await pool.end(() => console.log('Disconnected from POSTGRESQL DB'))

    if (dataHome) {
      return NextResponse.json({
        success: true,
        data: dataHome,
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
    const extractData = await Home.find({});

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
      message: "Something went wrong! Please try again",
    });
  }*/
}