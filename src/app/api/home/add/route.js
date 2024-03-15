import connectToDB from "@/database";
import Home from "@/models/Home";
import { NextResponse } from "next/server";
import { pool } from "@/utils/dbConnect";
import dbConnect from "@/utils/dbConnect";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    dbConnect()
    const extractData = await req.json();
    const { heading, summary } = extractData;

    const newHome = await pool.query('INSERT INTO home (heading, summary) VALUES ($1, $2) RETURNING *', [heading, summary])
    await pool.end(() => console.log('Disconnected from POSTGRESQL DB'))

    if (newHome.rows[0]) {
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
  }

  /*try {
    await connectToDB();
    const saveData = await Home.create(extractData);

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