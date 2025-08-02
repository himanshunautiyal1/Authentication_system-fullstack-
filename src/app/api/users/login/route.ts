import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    //chech if user wxist or not
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User doest not exist" },
        { status: 500 }
      );
    }

    //check  for password
    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json({ error: "Invalid Password" }, { status: 400 });
    }

    //create token data

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    //create toekn
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const respone = NextResponse.json({
      message: "Login successfull",
      success: true,
    });

    respone.cookies.set("token", token, {
      httpOnly: true,
    });

    return respone;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
