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

      <div className="grid grid-cols-1 gap-8 max-w-3xl mx-auto">

        {/* Brazil */}
        <Reveal delay={0.08}>
        <div className="border rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Visual Orion</h2>
          <div className="space-y-3">
            <div className="flex items-start">
              <MapPin className="mt-1 mr-2 text-blue-600" />
              <p>Rua São Simão, 152. Centro<br />Japaraíba, MG. 35580-000</p>
            </div>
            <div className="flex items-center">
              <Phone className="mr-2 text-blue-600" />
              <p>+55 (48) 99183-0315</p>
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
            src="https://www.google.com/maps?q=Rua%20S%C3%A3o%20Sim%C3%A3o%2C%20152%2C%20Centro%2C%20Japara%C3%ADba%2C%20MG%2C%2035580-000&output=embed"
          ></iframe>
        </div>
        </Reveal>
      </div>
    </div>
  );
}
