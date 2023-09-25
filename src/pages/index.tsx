import Header from "@/components/Header";
import RecentAds from "@/components/RecentAds"; 
export default function Home() :React.ReactNode {
  return (
    <>
      <body>
        <main className="main-content">
          <Header />
          <RecentAds/>
        </main>
      </body>
    </>
  );
}
