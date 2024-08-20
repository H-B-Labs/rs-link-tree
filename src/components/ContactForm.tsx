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

    const validateEmail = (email: string) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let currentErrors: FormErrors = {};

        if (!name.trim()) currentErrors.name = 'Name is required';
        if (!email.trim() || !validateEmail(email)) currentErrors.email = 'Valid email is required';
        if (!phone.trim()) currentErrors.phone = 'Phone is required';
        if (!subject.trim()) currentErrors.subject = 'Subject is required';
        if (!message.trim()) currentErrors.message = 'Message is required';

        setErrors(currentErrors);

        if (Object.keys(currentErrors).length === 0) {
            console.log({ name, email, phone, subject, message });

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
        </form>
    );
};

export default ContactForm;
