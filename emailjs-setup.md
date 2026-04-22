# EmailJS Setup Instructions

To enable the contact form to send emails, you need to configure EmailJS:

## Step 1: Create an EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Complete the verification process

## Step 2: Connect Your Email Account
1. In the EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Select your email provider (Gmail, Outlook, etc.) or SMTP
4. Follow the instructions to connect your email account

## Step 3: Create an Email Template
1. Go to "Email Templates" in the dashboard
2. Click "Create New Template"
3. Configure your template with the following variables:
   - `from_name` - Sender's name
   - `from_email` - Sender's email
   - `subject` - Email subject
   - `message` - Email message content
   - `to_name` - Recipient's name (your name)

## Step 4: Get Your Credentials
1. Note your User ID from the "Account" section
2. Note the Service ID of your connected email service
3. Note the Template ID of your created template

## Step 5: Update Your Code
In `src/components/sections/ContactSection.tsx`, replace the placeholders:
```javascript
const serviceId = 'YOUR_SERVICE_ID'; // Replace with your EmailJS service ID
const templateId = 'YOUR_TEMPLATE_ID'; // Replace with your EmailJS template ID
const userId = 'YOUR_USER_ID'; // Replace with your EmailJS user ID
```

## Alternative: Using Environment Variables (Recommended)
For better security, you can use environment variables:

1. Create a `.env` file in your project root
2. Add your credentials:
```
VITE_EMAILJS_USER_ID=your_user_id
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
```

3. Update the code to use environment variables:
```javascript
const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const userId = import.meta.env.VITE_EMAILJS_USER_ID;
```

Note: Vite requires environment variables to be prefixed with `VITE_` to be accessible in client-side code.
