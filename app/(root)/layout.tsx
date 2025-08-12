import { ChildProps } from "@/types";
import Footer from "./_components/Footer";

function Layout({ children }: ChildProps) {
  return (
    <div>
      <main className="bg-[url('/room-interior-design.webp')] bg-cover bg-top h-screen">
        {children}
        <Footer />
      </main>
    </div>
  );
}

export default Layout;
