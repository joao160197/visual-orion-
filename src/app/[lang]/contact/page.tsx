'use client'; 
import { useState, useEffect } from 'react';
import { Reveal } from '@/components/Reveal';
import { MapPin, Phone, Mail } from 'lucide-react';
import { getDictionary } from '@/get-dictionary';
import { Locale } from '@/i18n-config';

export default function ContactPage({ params }: { params: { lang: Locale } }) {
  const [dict, setDict] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDictionary = async () => {
      try {
        const dictionary = await getDictionary(params.lang);
        setDict(dictionary);
      } catch (error) {
        console.error('Failed to load dictionary:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDictionary();
  }, [params.lang]);

  // Show loading state while dictionary loads
  if (loading || !dict) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  return (
    <div className="bg-white text-gray-800 py-10 px-6 lg:px-24">
      <Reveal>
        <h1 className="text-4xl font-bold text-center mb-12">{dict.contactPage.title}</h1>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-8">
        {/* United States */}
        <Reveal>
        <div className="border rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Visual Orion</h2>
          <div className="space-y-3">
            <div className="flex items-start">
              <MapPin className="mt-1 mr-2 text-blue-600" />
              <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt."</p>
            </div>
            <div className="flex items-center">
              <Phone className="mr-2 text-blue-600" />
              <p>(000) 000-0000</p>
            </div>
            <div className="flex items-center">
              <Phone className="mr-2 text-blue-600" />
              <p>(000) 000-0000</p>
            </div>
            <div className="flex items-center">
              <Mail className="mr-2 text-blue-600" />
              <p>lorem.ipsum@example.com</p>
            </div>
          </div>
          <iframe
            className="w-full h-64 mt-4 rounded-lg"
            loading="lazy"
            allowFullScreen
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3267.5112893078845!2d-81.99453828476785!3d34.89102758038538!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88576fb87f1ac3ed%3A0xf8a7c6794a14e92e!2s4300%20Stone%20Station%20Rd%2C%20Roebuck%2C%20SC%2029376%2C%20USA!5e0!3m2!1sen!2sbr!4v1657371866374"
          ></iframe>
        </div>
        </Reveal>

        {/* Brazil */}
        <Reveal delay={0.08}>
        <div className="border rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Visual Orion</h2>
          <div className="space-y-3">
            <div className="flex items-start">
              <MapPin className="mt-1 mr-2 text-blue-600" />
              <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt."</p>
            </div>
            <div className="flex items-center">
              <Phone className="mr-2 text-blue-600" />
              <p>(00) 0000-0000</p>
            </div>
            <div className="flex items-center">
              <Mail className="mr-2 text-blue-600" />
              <p>lorem.ipsum@example.com</p>
            </div>
          </div>
          <iframe
            className="w-full h-64 mt-4 rounded-lg"
            loading="lazy"
            allowFullScreen
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3530.512469415803!2d-48.91804698503296!3d-26.266882981112875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94dea586a21472f9%3A0x37947421483cf861!2sPerini%20Business%20Park!5e0!3m2!1spt-BR!2sbr!4v1657371939025"
          ></iframe>
        </div>
        </Reveal>
      </div>
    </div>
  );
}
