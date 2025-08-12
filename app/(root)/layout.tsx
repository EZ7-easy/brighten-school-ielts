import { ChildProps } from "@/types";
import Footer from "./_components/Footer";

function Layout({ children }: ChildProps) {
  return (
    <div>
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
