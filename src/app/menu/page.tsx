import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MenuBrowser from "./MenuBrowser";
import { MENU_ITEMS } from "@/lib/menu-data";

export const revalidate = 60;
export const metadata = { title: "Menu" };

export default async function MenuPage() {
  return (
    <>
      <Header />
      <MenuBrowser items={MENU_ITEMS} />
      <Footer />
    </>
  );
}
