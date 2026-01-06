"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { submitQuoteForm } from "@/app/actions/forms";

const quoteFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  serviceType: z.string().min(1, "Please select a service type"),
  propertySize: z.string().min(1, "Please select property size"),
  stumpCount: z.string().min(1, "Please select number of stumps"),
  urgency: z.string().min(1, "Please select urgency"),
  message: z.string().optional(),
});

type QuoteFormValues = z.infer<typeof quoteFormSchema>;

interface QuoteFormProps {
  businessId: string;
  businessName: string;
}

export function QuoteForm({ businessId, businessName }: QuoteFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      serviceType: "",
      propertySize: "",
      stumpCount: "",
      urgency: "",
      message: "",
    },
  });

  async function onSubmit(data: QuoteFormValues) {
    setIsSubmitting(true);
    try {
      const result = await submitQuoteForm({
        businessId,
        businessName,
        ...data,
      });

      if (result.success) {
        toast.success("Quote request sent!", {
          description: `${businessName} will review your request and contact you with a quote soon.`,
        });
        form.reset();
      } else {
        toast.error("Failed to send quote request", {
          description: result.error || "Please try again later.",
        });
      }
    } catch (error) {
      toast.error("Failed to send quote request", {
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="your@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="(555) 123-4567" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="serviceType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Type</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="What service do you need?" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="stump-removal">Stump Removal</SelectItem>
                  <SelectItem value="stump-grinding">Stump Grinding</SelectItem>
                  <SelectItem value="tree-removal">Tree Removal</SelectItem>
                  <SelectItem value="emergency">Emergency Service</SelectItem>
                  <SelectItem value="consultation">Consultation</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField
            control={form.control}
            name="propertySize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property Size</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="small">Small (&lt; 5,000 sq ft)</SelectItem>
                    <SelectItem value="medium">Medium (5,000-10,000 sq ft)</SelectItem>
                    <SelectItem value="large">Large (10,000-20,000 sq ft)</SelectItem>
                    <SelectItem value="very-large">Very Large (&gt; 20,000 sq ft)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stumpCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Stumps</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="How many?" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">1 stump</SelectItem>
                    <SelectItem value="2-3">2-3 stumps</SelectItem>
                    <SelectItem value="4-5">4-5 stumps</SelectItem>
                    <SelectItem value="6-10">6-10 stumps</SelectItem>
                    <SelectItem value="10+">More than 10</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="urgency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Urgency</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="When needed?" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="urgent">Urgent (ASAP)</SelectItem>
                    <SelectItem value="this-week">This Week</SelectItem>
                    <SelectItem value="this-month">This Month</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Details (optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us more about your project, stump sizes, accessibility, etc."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Request Free Quote"}
        </Button>
      </form>
    </Form>
  );
}
