import { Fragment } from "react";
import { AdCardProps } from "./AdCard";
import AdCard from "./AdCard";
import styles from "./RecentAds.module.css";

const RecentAds = (): React.ReactNode => {
  const ads: AdCardProps[] = [
    {
      imgUrl: "/images/table.webp",
      link: "/ads/table",
      price: 120,
      title: "Table",
      category: { id: 1, name: "Ameublement" },
    },
    {
      imgUrl: "/images/dame-jeanne.webp",
      link: "/ads/dame-jeanne",
      price: 75,
      category: { id: 2, name: "Décoration" },
      title: "Dame Jeanne",
    },
    {
      imgUrl: "/images/bougie.webp",
      link: "/ads/bougie",
      price: 5,
      category: { id: 3, name: "Décoration" },
      title: "Bougie",
    },
    {
      imgUrl: "/images/porte-magazine.webp",
      link: "/ads/porte-magazine",
      price: 15,
      category: { id: 4, name: "Ameublement" },
      title: "Porte magazine",
    },
    {
      imgUrl: "/images/vaisselier.webp",
      link: "/ads/vaisselier",
      price: 200,
      category: { id: 5, name: "Décoration" },
      title: "Vaisselier",
    },
    {
      imgUrl: "/images/vide-poche.webp",
      link: "/ads/vide-poche",
      price: 10,
      category: { id: 6, name: "Décoration" },
      title: "Botte",
    },
  ];

  return (
    <main className="main-content">
      <h2>Annonces récentes</h2>
      <section className={styles.recentAds}>
        {ads.map((ad) => (
          <AdCard
            title={ad.title}
            category={ad.category}
            imgUrl={ad.imgUrl}
            link={ad.link}
            price={ad.price}
            key={ad.title}
          />
        ))}
      </section>
    </main>
  );
};
export default RecentAds;
