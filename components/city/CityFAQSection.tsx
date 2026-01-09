import { ChevronDown } from "lucide-react";
import type { CityFAQ } from "@/lib/content/city-data";

interface CityFAQSectionProps {
  cityName: string;
  faqs: CityFAQ[];
}

export default function CityFAQSection({ cityName, faqs }: CityFAQSectionProps) {
  return (
    <section className="bg-gradient-to-br from-amber-50 via-stone-50 to-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Frequently Asked Questions About Stump Removal in {cityName}
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer p-6 hover:bg-gray-50 transition-colors">
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  <ChevronDown className="h-5 w-5 text-gray-600 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <div className="px-6 pb-6 pt-2">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
