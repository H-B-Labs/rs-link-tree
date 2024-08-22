"use client";
"use client";
import React, { useState } from 'react';

interface ContactFormProps {
    onSubmit?: () => void;
}

interface FormErrors {
    name?: string;
    email?: string;
    phone?: string;
    subject?: string;
    message?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState<FormErrors>({});
    const [result, setResult] = useState('');

    const validateEmail = (email: string) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        let currentErrors: FormErrors = {};

        if (!name.trim()) currentErrors.name = 'Name is required';
        if (!email.trim() || !validateEmail(email)) currentErrors.email = 'Valid email is required';
        if (!phone.trim()) currentErrors.phone = 'Phone is required';
        if (!subject.trim()) currentErrors.subject = 'Subject is required';
        if (!message.trim()) currentErrors.message = 'Message is required';

        setErrors(currentErrors);

        if (Object.keys(currentErrors).length === 0) {
            setResult("Sending....");
            const formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            formData.append("phone", phone);
            formData.append("subject", subject);
            formData.append("message", message);
            formData.append("access_key", "5b5a713f-aa16-4eee-87fe-3481fd4e47a6");

            try {
                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    body: formData
                });

                const data = await response.json();

                if (data.success) {
                    setResult("Form Submitted Successfully");
                    console.log("Success", data);
                    (e.target as HTMLFormElement).reset();
                } else {
                    console.log("Error", data);
                    setResult(data.message);
                }
            } catch (error) {
                console.error("Error submitting form", error);
                setResult("An error occurred while submitting the form.");
            }

            // Optionally trigger the onSubmit callback
            if (onSubmit) {
                onSubmit();
            }

            // Reset form fields and errors after successful submission
            setName('');
            setEmail('');
            setPhone('');
            setSubject('');
            setMessage('');
            setErrors({});
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col p-6 space-y-4 bg-white rounded-lg shadow-lg w-full max-w-lg">
            <div>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A52A2A] text-black"
                    required
                />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>
            <div>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A52A2A] text-black"
                    required
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>
            <div>
                <input
                    type="tel"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A52A2A] text-black"
                    required
                />
                {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A52A2A] text-black"
                    required
                />
                {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject}</p>}
            </div>
            <div>
                <textarea
                    placeholder="Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A52A2A] text-black resize-none"
                    rows={4}
                    required
                />
                {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
            </div>
            <button type="submit" className="w-full px-4 py-2 text-white bg-[#A52A2A] rounded-lg hover:bg-opacity-90 transition-colors">
                Send
            </button>
            {result && <p className="mt-4 text-sm text-green-500">{result}</p>}
        </form>
    );
};

export default ContactForm;