import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function POST(request: NextRequest) {
  await connect();

  try {
    const reqBody = await request.json();

    const { email, confirmPassword } = reqBody;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "Email is Not Registered" },
        { status: 400 }
      );
    }

    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(confirmPassword, salt);

    const updatedUser = await User.findOneAndUpdate({
      email,
      password: hashedPassword,
      new: true,
    });

    await updatedUser.save();

    return NextResponse.json(
      { message: "Succesfully Reset the Password" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "The Server Error and Reset of Password Failed" },
      { status: 500 }
    );
  }
}
