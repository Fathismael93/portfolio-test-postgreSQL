import connectToDB from "@/database";
import Contact from "@/models/Contact";
import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import { pool } from "@/utils/dbConnect";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    dbConnect()
    const extractData = await req.json();
    const { name, email } = extractData;

    const newContact = await pool.query('INSERT INTO contact (name, email) VALUES ($1, $2) RETURNING *',
                                    [name, email])
    await pool.end(() => console.log('Disconnected from POSTGRESQL DB'))

    if (newContact.rows[0]) {
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
    const saveData = await Contact.create(extractData);

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