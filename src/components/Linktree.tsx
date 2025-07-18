import React from 'react'
import Image from 'next/image'

type LinktreeItem = {
    label: string
    url: string
    imgSrc: string
    imgAlt: string
}

const links: LinktreeItem[] = [
    {
        label: 'Website',
        url: 'https://rogue-solar.com/',
        imgSrc: '/icons8-link-50.png',
        imgAlt: 'Link Icon',
    },
    {
        label: 'Instagram',
        url: 'https://www.instagram.com/goroguesolar/',
        imgSrc: '/icons8-instagram-50.png',
        imgAlt: 'Instagram Icon',
    },
    {
        label: 'X',
        url: 'https://x.com/GoRogueSolar',
        imgSrc: '/x-50.png',
        imgAlt: 'X Icon',
    },
    {
        label: 'Facebook',
        url: 'https://www.facebook.com/share/aqowFF6EE39bLKXg/?mibextid=LQQJ4d',
        imgSrc: '/facebook.png',
        imgAlt: 'Facebook Icon',
    },
    {
        label: 'TikTok',
        url: 'https://www.tiktok.com/@goroguesolar?_t=ZP-8xHvbVLZ5GI&_r=1',
        imgSrc: '/icons8-tiktok-logo-50.png', // Add tiktok.png to your /public folder
        imgAlt: 'TikTok Icon',
    },
    /*{
        label: 'LinkedIn',
        url: 'https://linkedin.com',
        imgSrc: '/linkedin.png',
        imgAlt: 'LinkedIn Icon',
    },*/
]

const Linktree: React.FC = () => {
    return (
        <div className="flex flex-col items-center space-y-6 p-8">
            {links.map((link) => (
                <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 rounded-lg p-4 w-full max-w-xs transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
                    style={{
                        backgroundColor: '#A52A2A', // Brown color
                        color: '#F5F5DC',           // Beige color
                        border: '1px solid #A52A2A',
                    }}
                >
                    <div className="flex-shrink-0">
                        <Image src={link.imgSrc} alt={link.imgAlt} width={28} height={28} />
                    </div>
                    <span className="text-xl font-semibold tracking-wide">{link.label}</span>
                </a>
            ))}
        </div>
    )
}

export default Linktree
