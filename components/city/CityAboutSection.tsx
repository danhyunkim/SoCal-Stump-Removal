interface CityAboutSectionProps {
  cityName: string;
  content: string;
}

export default function CityAboutSection({ cityName, content }: CityAboutSectionProps) {
  // Split content into paragraphs
  const paragraphs = content.split("\n\n").filter((p) => p.trim());

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Professional Stump Removal Services in {cityName}
          </h2>
          <div className="prose prose-lg max-w-none">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="text-gray-600 mb-4 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
