import Image from "next/image";
import Banner from "./_components/banner";

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[url('/room-interior-design-blur.webp')] bg-cover bg-top">
      <Image
        src="/logo.png"
        alt="Brighten School Logo"
        width={200}
        height={200}
        className="p-5 mb-15"
      />
      <Banner />
    </div>
  );
}

export default HomePage;
