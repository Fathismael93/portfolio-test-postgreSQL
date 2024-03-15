import connectToDB from "@/database";
import Home from "@/models/Home";
import { NextResponse } from "next/server";
import { pool } from "@/utils/dbConnect";
import dbConnect from "@/utils/dbConnect";

export const dynamic = "force-dynamic";

export async function PUT(req) {

  dbConnect()
  try {
    const extractData = await req.json();
    const { heading, summary } = extractData;

    const newHome = await pool.query('INSERT INTO home (heading, summary) VALUES ($1, $2) RETURNING *', [heading, summary])
    console.log(newHome.rows[0])
  } catch (error) {
    console.error("Error in adding data to home", error)
  }

  /*try {
    await connectToDB();

    const extractData = await req.json();
    const { _id, heading, summary } = extractData;

    const updateData = await Home.findOneAndUpdate(
      {
        _id: _id,
      },
      { heading, summary },
      { new: true }
    );

    if (updateData) {
      return NextResponse.json({
        success: true,
        message: "updated successfully",
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