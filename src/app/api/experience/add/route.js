import connectToDB from "@/database";
import Experience from "@/models/Experience";
import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import { pool } from "@/utils/dbConnect";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    dbConnect()
    const extractData = await req.json();
    const { position, company, duration, location, jobprofile } = extractData;

    const newExperience = await pool.query('INSERT INTO experience (position, company, duration, location, jobprofile) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                                    [position, company, duration, location, jobprofile])
    await pool.end(() => console.log('Disconnected from POSTGRESQL DB'))

    if (newExperience.rows[0]) {
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
    const extractData = await req.json();
    const saveData = await Experience.create(extractData);

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