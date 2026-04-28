import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export function PageShell({ children }) {
  return (
    <div className="relative min-h-screen">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
