import { connectDB } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

export async function POST(request: NextRequest) {
  await connectDB();

  try {
    const reqBody = await request.json();

    const { token } = reqBody;

    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "Token Not6 valid for Password Reset",
        },
        {
          status: 400,
        }
      );
    }

    user.forgotPasswordToken = null;
    user.forgotPasswordTokenExpiry = null;

    await user.save();

    return NextResponse.json(
      { message: "Token valid for the Password Reset", email: user.email },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
