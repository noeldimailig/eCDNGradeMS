// lib/auth.ts (server-side)
import { db, users } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { verificationTokens } from "@/db/schema";

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GOOGLE_EMAIL,
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});

async function sendVerificationEmail(email: string, token: string) {
  const verificationLink = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`;

  const mailOptions = {
    from: process.env.GOOGLE_EMAIL,
    to: email,
    subject: "🔐 Verify Your Email - Secure Your Account",
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 500px; background-color: #ffffff; border-radius: 10px; padding: 20px; text-align: center; margin: auto; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);">
          <h2 style="color: #333;">Welcome to <span style="color: #007bff;">YourApp</span>! 🎉</h2>
          <p style="color: #555;">You're almost there! Click the button below to verify your email:</p>
          <a href="${verificationLink}" style="display: inline-block; background-color: #007bff; color: #ffffff; text-decoration: none; padding: 12px 20px; border-radius: 5px; font-size: 16px;">
            ✅ Verify My Email
          </a>
          <p style="color: #777; font-size: 14px; margin-top: 10px;">If the button doesn't work, copy and paste the following link into your browser:</p>
          <p style="word-wrap: break-word; font-size: 12px; color: #007bff;">${verificationLink}</p>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
          <p style="color: #999; font-size: 12px;">If you didn't request this email, ignore it.</p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}

export async function signUp(email: string, password: string) {
  try {
    const existingUser = await db.select().from(users).where(eq(users.email, email)).execute();

    if (existingUser && existingUser.length > 0) {
      return { success: false, error: "Email already exists." };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    const [newUser] = await db.insert(users).values({
      id: sql`uuid_generate_v4()`,
      email,
      password: hashedPassword,
      role: "Student",
    }).returning({ id: users.id });

    await db.insert(verificationTokens).values({
      identifier: email,
      token: verificationToken,
      expires,
    });

    // Send verification email
    await sendVerificationEmail(email, verificationToken);

    return { success: true };
  } catch (error) {
    console.error("Signup error:", error);
    return { success: false, error: "Signup failed." };
  }
}
