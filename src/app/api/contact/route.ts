import { NextResponse } from "next/server";
import { Resend } from "resend";

const resendApiKey =
  process.env.RESEND_API_KEY;

if (!resendApiKey) {
  console.error(
    "RESEND_API_KEY is not configured.",
  );
}

const resend = new Resend(resendApiKey);

/*
 * Send a contact form message to the
 * Lazuli Outlook inbox.
 */
export async function POST(
  request: Request,
) {
  try {
    /*
     * Read the submitted form data.
     */
    const body = await request.json();

    const {
      name,
      email,
      subject,
      message,
    } = body;

    /*
     * Validate that all required fields
     * have been provided.
     */
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof subject !== "string" ||
      typeof message !== "string" ||
      !name.trim() ||
      !email.trim() ||
      !subject.trim() ||
      !message.trim()
    ) {
      return NextResponse.json(
        {
          error:
            "Please complete all fields.",
        },
        {
          status: 400,
        },
      );
    }

    /*
     * Make sure the Resend API key exists.
     */
    if (!resendApiKey) {
      return NextResponse.json(
        {
          error:
            "Email service is not configured.",
        },
        {
          status: 500,
        },
      );
    }

    /*
     * Send the email through Resend.
     */
    const { error } =
      await resend.emails.send({
        from:
          "Lazuli <onboarding@resend.dev>",

        to: [
          "handmadelazuli@outlook.com",
        ],

        /*
         * When you reply to the email,
         * Outlook will reply directly to
         * the customer.
         */
        replyTo: email.trim(),

        subject:
          `Lazuli Contact: ${subject.trim()}`,

        text: `
New message from the Lazuli website

Name: ${name.trim()}
Email: ${email.trim()}

Subject:
${subject.trim()}

Message:
${message.trim()}
        `.trim(),
      });

    /*
     * Resend returned an error.
     */
    if (error) {
      console.error(
        "Resend error:",
        error,
      );

      return NextResponse.json(
        {
          error:
            "Unable to send your message.",
        },
        {
          status: 500,
        },
      );
    }

    /*
     * Email was successfully sent.
     */
    return NextResponse.json(
      {
        success: true,
        message:
          "Email sent successfully.",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    /*
     * Handle unexpected API errors.
     */
    console.error(
      "Contact API error:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "Unable to send your message.",
      },
      {
        status: 500,
      },
    );
  }
}