import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";

export async function POST(request: NextRequest) {
  await connect();

  try {
    const reqBody = await request.json();

    const { email } = reqBody;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "Email is Not Registered" },
        { status: 400 }
      );
    }

    await sendEmail({ email, emailType: "RESET", userId: user._id });

    return NextResponse.json(
      { message: "Succesfully sent to the user email" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
