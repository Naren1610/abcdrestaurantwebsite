import MenuHero from "@/components/ui/Menu/MenuHero";
import MenuAccordion from "@/components/ui/Menu/MenuAccordion";
import CartContainer from "@/components/ui/Cart/CartContainer";

export const metadata = {
  title: "Our Menu | ABCD Restaurant",
  description: "Explore our diverse menu rooted in rich culinary traditions.",
};

export default function MenuPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <MenuHero />

      {/* Menu Categories — accordion on sm/md, always expanded on lg+ */}
      <div className="flex flex-col w-full bg-background">
        <MenuAccordion />
      </div>

      {/* Cart Components */}
      <CartContainer />
    </div>
  );
}
