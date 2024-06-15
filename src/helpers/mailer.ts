import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

const getTransportConfig = () => {
  if (process.env.NODE_ENV === "production") {
    return {
      service: "gmail",
      secure: true,
      port: 465,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    };
  } else {
    return {
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_SMTP_USER,
        pass: process.env.MAILTRAP_SMTP_PASS,
      },
    };
  }
};

export const sendEmail = async ({
  email,
  emailType,
  userId,
}: {
  email: string;
  emailType: "VERIFY" | "RESET";
  userId: string;
}) => {
  console.log({ email, emailType, userId });

  try {
    // create a hased token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transportConfig = getTransportConfig();

    var transport = nodemailer.createTransport(transportConfig);

    const mailOptions = {
      from: "arnab.paul.1656@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",

      html: `${
        emailType === "VERIFY"
          ? `
          <p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to verify your email</p>
          <p>or copy and paste the link below in your browser:</p>
          <p>${process.env.DOMAIN}/verifyemail/?token=${hashedToken}</p>`
          : `<p>Click <a href="${process.env.DOMAIN}/verifyemail/createpassword?token=${hashedToken}">here</a> to reset your password</p>
          <p>or copy and paste the link below in your browser:</p>
          <p>${process.env.DOMAIN}/verifyemail/createpassword?token=${hashedToken}</p>`
      }`,

      // `<p>Click <a href="${
      //   process.env.DOMAIN
      // }/verifyemail?token=${hashedToken}">here</a> to ${
      //   emailType === "VERIFY" ? "verify your email" : "reset your password"
      // }
      //       or copy and paste the link below in your browser. <br> ${
      //         process.env.DOMAIN
      //       }/verifyemail/?token=${hashedToken}
      //       </p>`
    };

    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
