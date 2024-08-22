"use client";
import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Linktree from "../components/Linktree";
import ContactForm from "../components/ContactForm";

export default function Home() {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleFormSubmit = () => {
    setIsFormSubmitted(true);
  };

  const skipToLinks = () => {
    setIsFormSubmitted(true);
  };

  return (
    <>
      <Head>
        <title>My Linktree - Connect with Us</title>
        <meta
          name="description"
          content="Discover and connect with us through our personalized linktree. Fill out the contact form to unlock our exclusive links."
        />
        <meta
          name="keywords"
          content="linktree, contact form, social media links, connect"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
      </Head>
      <main>
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-[#F5F5DC]">
          {/* Logo at the top center */}
          <Image
            src="/logo.png"
            alt="Logo"
            width={150} // Adjusted width for mobile
            height={150} // Adjusted height for mobile
            className="mb-8"
          />
          <h1 className="mb-4 text-3xl font-extrabold text-center text-[#A52A2A] drop-shadow-lg md:text-4xl">
            Schedule a Quote Today!
          </h1>

          {/* Skip to Links plain text */}
          {!isFormSubmitted && (
            <button
              onClick={skipToLinks}
              className="mb-4 text-[#A52A2A] underline"
            >
              Skip to Links
            </button>
          )}

          <div className="w-full max-w-xs md:max-w-md">
            {!isFormSubmitted && <ContactForm onSubmit={handleFormSubmit} />}
            {isFormSubmitted && (
              <div className="w-full space-y-4">
                <Linktree />
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}