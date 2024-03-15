import connectToDB from "@/database";
import User from "@/models/User";
import { compare, hash } from "bcryptjs";
import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import { pool } from "@/utils/dbConnect";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    dbConnect()
    const extractData = await req.json();

    const query = await pool.query('SELECT * FROM users WHERE username=$1', [extractData.username]);
    const dataLogin = await query.rows;
    const { username, password } = dataLogin[0]
    console.log(password, username)

    if (!username) {
      console.error("Error 1: No user wuth that name")
      return NextResponse.json({
        success: false,
        message: "User name is not present !Please try again",
      });
    }
    
    await pool.end()

    console.log("ici: " + password)
    const hashPassword = await hash(password, 12);
    const checkPassword = await compare(extractData.password, hashPassword);

    if (!checkPassword) {
      console.error("Error 2: Password wrong")
      return NextResponse.json({
        success: false,
        message: "Wrong password. Please try again",
      });
    }
    return NextResponse.json({
      success: true,
      message: "Login successfull",
    });
  } catch (e) {
    console.error("Error 1: error in the catch" + e) 

    return NextResponse.json({
      success: false,
      message: "Something goes wrong !Please try again",
    });
  }

  /*try {
    await connectToDB();
    const { username, password } = await req.json();

    const checkUser = await User.findOne({ username });

    if (!checkUser) {
      return NextResponse.json({
        success: false,
        message: "User name is not present !Please try again",
      });
    }

    const hashPassword = await hash(checkUser.password, 12);
    const checkPassword = await compare(password, hashPassword);

    if (!checkPassword) {
      return NextResponse.json({
        success: false,
        message: "Wrong password. Please try again",
      });
    }
    return NextResponse.json({
      success: true,
      message: "Login successfull",
    });
  } catch (e) {
    console.log(e);

    return NextResponse.json({
      success: false,
      message: "Something goes wrong !Please try again",
    });
  }*/
}