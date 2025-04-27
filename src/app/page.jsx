import Footer from "./parts/footer";
import Header from "./parts/Header";
import Homepage from "./parts/Homepage";

export const metadata = {
  title: "Hire Arrive",
  description: "Help Businesses Grow",
};

export default function Home() {
  return (
    <div className="flex-1 flex flex-col">
      <Header />
      <Homepage />
      <Footer />
    </div>
  );
}
