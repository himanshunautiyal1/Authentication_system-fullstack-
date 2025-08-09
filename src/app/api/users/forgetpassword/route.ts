import { connect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

connect();

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json(
        { error: "Please enter the email" },
        { status: 404 }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "No user with this email" },
        { status: 404 }
      );
    }

    console.log("User found:", user);
    console.log("User ID:", user._id);

    await sendEmail({ email, emailType: "RESET", userId: user._id });
    return NextResponse.json({ message: "Reset email sent" });
  } catch (error: any) {
    console.error("Forget password error:", error);
    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );
  }
}
