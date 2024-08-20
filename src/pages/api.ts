76f10f2cee977da2b3d0afbe81f0cce7 sk 77ce135d49a3bd541c9cbece4f832692 apikey

import type { NextApiRequest, NextApiResponse } from 'next';
import mailjet from 'node-mailjet';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, phone, subject, message } = req.body;

    // Hard-coded Mailjet API keys
    const mailjetClient = mailjet.connect(
      'your-public-key-here', // Replace with your Mailjet public API key
      'your-private-key-here' // Replace with your Mailjet private API key
    );

    try {
      const request = mailjetClient.post('send', { version: 'v3.1' }).request({
        Messages: [
          {
            From: {
              Email: 'sender@example.com', // Replace with your sender email
              Name: 'Your Name', // Replace with your sender name
            },
            To: [
              {
                Email: 'recipient@example.com', // Replace with the recipient email
                Name: 'Recipient Name', // Replace with the recipient name
              },
            ],
            Subject: subject,
            TextPart: `You have a new contact form submission from:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
          },
        ],
      });

      await request;
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ success: false, error: 'Failed to send email' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
