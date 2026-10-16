import type { Metadata } from "next";
import ContactContent from "@/components/ui/Contact/ContactContent";

export const metadata: Metadata = {
  title: "Contact Us | ABCD Restaurant",
  description:
    "Get in touch with ABCD Restaurant in Malvern, PA. Contact our hospitality team for table inquiries, private dining, or questions about our authentic menu.",
};

export default function ContactPage() {
  return <ContactContent />;
}
