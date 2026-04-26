'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  // 👇 Honeypot field (bots usually fill this)
  const website = formData.get('website') as string;

  if (website) {
    // silently ignore bots
    return { success: true };
  }

  if (!name || !email || !message) {
    return { success: false, error: 'Missing fields' };
  }

  try {
    await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: 'pjorge.silvaa@gmail.com',
      subject: `New contact from ${name}`,
      replyTo: email,
      html: `
        <h2>New Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return { success: true };
  } catch (err) {
    return { success: false, error: 'Email failed to send' };
  }
}