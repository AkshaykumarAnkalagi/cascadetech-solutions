import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, message } = body;

    // Basic validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Please provide a valid full name." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json(
        { error: "Please enter a message of at least 10 characters." },
        { status: 400 }
      );
    }

    const recipientEmail =
      process.env.CONTACT_RECEIVER_EMAIL ||
      "cascadetechnologiessolutions@gmail.com";

    const resendApiKey = process.env.RESEND_API_KEY;

    // Live Resend integration via official REST API when API key is provided
    if (resendApiKey && resendApiKey !== "re_your_api_key_here" && resendApiKey.trim().length > 5) {
      const fromEmail =
        process.env.RESEND_FROM_EMAIL ||
        "CascadeTech Solutions <onboarding@resend.dev>";

      const emailPayload = {
        from: fromEmail,
        to: [recipientEmail],
        reply_to: email,
        subject: `New Project Inquiry from ${name}${company ? ` (${company})` : ""}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #0b0f19; color: #f8fafc; padding: 32px; border-radius: 12px; border: 1px solid rgba(0, 242, 254, 0.2);">
            <div style="border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 16px; margin-bottom: 24px;">
              <h2 style="color: #00F2FE; margin: 0; font-size: 20px;">New Inquiry: CascadeTech Solutions</h2>
              <p style="color: #94a3b8; font-size: 13px; margin: 4px 0 0;">Received via cascade website contact form</p>
            </div>
            
            <div style="margin-bottom: 16px;">
              <strong style="color: #38bdf8; font-size: 12px; text-transform: uppercase;">From:</strong>
              <p style="margin: 4px 0 0; font-size: 16px;">${name}</p>
            </div>

            <div style="margin-bottom: 16px;">
              <strong style="color: #38bdf8; font-size: 12px; text-transform: uppercase;">Email:</strong>
              <p style="margin: 4px 0 0; font-size: 16px;"><a href="mailto:${email}" style="color: #00F2FE; text-decoration: none;">${email}</a></p>
            </div>

            ${
              company
                ? `<div style="margin-bottom: 16px;">
                    <strong style="color: #38bdf8; font-size: 12px; text-transform: uppercase;">Company / Organization:</strong>
                    <p style="margin: 4px 0 0; font-size: 16px;">${company}</p>
                  </div>`
                : ""
            }

            <div style="margin-bottom: 24px;">
              <strong style="color: #38bdf8; font-size: 12px; text-transform: uppercase;">Project Details & Message:</strong>
              <div style="background: rgba(255,255,255,0.04); padding: 16px; border-radius: 8px; margin-top: 8px; font-size: 15px; line-height: 1.6; white-space: pre-wrap; border-left: 3px solid #00F2FE;">
                ${message}
              </div>
            </div>

            <div style="border-top: 1px solid rgba(255,255,255,0.08); padding-top: 16px; font-size: 12px; color: #64748b;">
              <p style="margin: 0;">CascadeTech Solutions • Vidya-Nagar, Hubballi, Karnataka, India – 580021</p>
            </div>
          </div>
        `,
      };

      const resendResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey.trim()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailPayload),
      });

      const resendData = await resendResponse.json();

      if (!resendResponse.ok) {
        console.error("Resend API delivery error:", resendData);
        return NextResponse.json(
          {
            error: "Failed to send email. Please try again or email us directly.",
            details: resendData.message || resendData.name,
          },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "Your message has been sent successfully. Our team will contact you within 24 hours.",
      });
    }

    // Graceful simulation mode when API key is pending
    console.log("------------------------------------------");
    console.log("INCOMING CONTACT INQUIRY [SIMULATED MODE]:");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Company:", company || "(None provided)");
    console.log("Message:", message);
    console.log("To enable live email delivery, set RESEND_API_KEY in .env.local");
    console.log("------------------------------------------");

    return NextResponse.json({
      success: true,
      message:
        "Thank you! Your message has been received. Our engineering team will review it and get back to you shortly.",
      simulated: true,
    });
  } catch (error) {
    console.error("Error processing contact request:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
