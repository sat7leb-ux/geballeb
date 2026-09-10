import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MenuBrowser from "./MenuBrowser";
import { MENU_ITEMS } from "@/lib/menu-data";

export const revalidate = 60;
export const metadata = { title: "Menu" };

export default async function MenuPage() {
  const items = MENU_ITEMS;
  const cuisineNames = [...new Set(MENU_ITEMS.map((i) => i.cuisine))];

  return (
    <>
      <Header />
      <MenuBrowser items={items} cuisineNames={cuisineNames} />
      <Footer />
    </>
  );
}
