import { notFound } from "next/navigation";
import { getBusinessBySlug } from "@/lib/supabase/queries";
import { generateBusinessMetadata } from "@/lib/seo/metadata";
import { generateLocalBusinessSchema, generateBreadcrumbSchema } from "@/lib/seo/schema";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, MapPin, Phone, Globe, Clock, Mail, ChevronRight } from "lucide-react";
import { formatPhoneNumber } from "@/lib/utils";
import Link from "next/link";
import { PhotoLightbox } from "@/components/ui/photo-lightbox";
import { ContactForm } from "@/components/forms/ContactForm";
import { QuoteForm } from "@/components/forms/QuoteForm";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const business = await getBusinessBySlug(slug);
  if (!business) return {};
  return generateBusinessMetadata(business);
}

export default async function BusinessPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const business = await getBusinessBySlug(slug);

  if (!business) {
    notFound();
  }

  const localBusinessSchema = generateLocalBusinessSchema(business);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: business.city || "Businesses", url: `/search?location=${business.city}` },
    { name: business.name, url: `/businesses/${business.slug}` },
  ]);

  const hours = business.hours as Record<string, string>;
  const serviceAreas = business.service_areas as string[];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="relative bg-gradient-to-br from-amber-50 via-stone-50 to-white py-8">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-100 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          {/* Breadcrumbs */}
          <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href={`/search?location=${business.city}`} className="hover:text-primary transition-colors">
            {business.city}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900 font-medium">{business.name}</span>
        </div>

        {/* Business Header */}
        <div className="mb-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
                {business.name}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-4">
                {business.review_count > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-lg font-semibold text-gray-900">
                        {business.rating.toFixed(1)}
                      </span>
                    </div>
                    <span className="text-gray-600">
                      ({business.review_count} reviews)
                    </span>
                  </div>
                )}
                {business.price_range && (
                  <Badge variant="secondary" className="text-base">
                    {business.price_range}
                  </Badge>
                )}
                {business.is_featured && (
                  <Badge className="bg-accent text-white">Featured</Badge>
                )}
              </div>
            </div>
            <div className="flex gap-3">
              <Link href={`#contact`}>
                <Button size="lg" className="bg-accent hover:bg-accent-dark">
                  Get a Quote
                </Button>
              </Link>
              {!business.is_claimed && (
                <Link href={`/claim?business=${business.id}`}>
                  <Button size="lg" variant="outline">
                    Claim Business
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Photo Gallery */}
            {business.photos && business.photos.length > 0 && (
              <PhotoLightbox photos={business.photos} />
            )}

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {business.description}
                </p>
              </CardContent>
            </Card>

            {/* Categories */}
            {business.categories && business.categories.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {business.categories.map((category) => (
                      <Badge key={category.id} variant="secondary">
                        {category.name}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Reviews */}
            {business.reviews && business.reviews.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Customer Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {business.reviews.map((review) => (
                      <div key={review.id} className="border-b pb-4 last:border-0">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "fill-gray-200 text-gray-200"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="font-medium text-gray-600">{review.author_name}</span>
                          <span className="text-sm text-gray-600">
                            {new Date(review.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        {review.comment && (
                          <p className="text-gray-600">{review.comment}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {business.phone && (
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <a
                        href={`tel:${business.phone}`}
                        className="font-medium hover:text-primary"
                      >
                        {formatPhoneNumber(business.phone)}
                      </a>
                    </div>
                  </div>
                )}
                {business.email && (
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <a
                        href={`mailto:${business.email}`}
                        className="font-medium hover:text-primary break-all"
                      >
                        {business.email}
                      </a>
                    </div>
                  </div>
                )}
                {business.website && (
                  <div className="flex items-start gap-3">
                    <Globe className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Website</p>
                      <a
                        href={business.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium hover:text-primary break-all"
                      >
                        {business.website.replace(/^https?:\/\//, "")}
                      </a>
                    </div>
                  </div>
                )}
                {business.address && (
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Address</p>
                      <p className="font-medium text-gray-600">
                        {business.address}
                        <br />
                        {business.city}, CA {business.zip_code}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Hours */}
            {hours && Object.keys(hours).length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Business Hours</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {Object.entries(hours).map(([day, time]) => (
                      <div key={day} className="flex justify-between">
                        <span className="text-gray-600">{day}</span>
                        <span className="font-medium text-gray-600">{time}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Service Areas */}
            {serviceAreas && serviceAreas.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Service Areas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {serviceAreas.map((area) => (
                      <Badge key={area} variant="outline">
                        {area}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Contact Form Section */}
        <div id="contact" className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Get in Touch</CardTitle>
              <p className="text-gray-600 mt-2">
                Fill out the form below to get in touch.
              </p>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="quote" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="quote">Request a Quote</TabsTrigger>
                  <TabsTrigger value="contact">Send a Message</TabsTrigger>
                </TabsList>
                <TabsContent value="quote" className="mt-6">
                  <QuoteForm businessId={business.id} businessName={business.name} />
                </TabsContent>
                <TabsContent value="contact" className="mt-6">
                  <ContactForm businessId={business.id} businessName={business.name} />
                </TabsContent>
              </Tabs>

              {/* Quick Contact Buttons */}
              <div className="mt-6 pt-6 border-t">
                <p className="text-sm text-gray-600 mb-3">Or reach out directly:</p>
                <div className="flex flex-wrap gap-3">
                  {business.phone && (
                    <a href={`tel:${business.phone}`}>
                      <Button variant="outline">
                        <Phone className="mr-2 h-4 w-4" />
                        Call Now
                      </Button>
                    </a>
                  )}
                  {business.email && (
                    <a href={`mailto:${business.email}`}>
                      <Button variant="outline">
                        <Mail className="mr-2 h-4 w-4" />
                        Send Email
                      </Button>
                    </a>
                  )}
                  {business.website && (
                    <a href={business.website} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline">
                        <Globe className="mr-2 h-4 w-4" />
                        Visit Website
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        </div>
      </div>
    </>
  );
}