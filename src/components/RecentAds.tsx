import {AdCardProps}  from "./AdCard";
import AdCard  from "./AdCard";

const RecentAds = () :React.ReactNode => {
  const ads: AdCardProps[] = [
    {
      imgUrl: "/images/table.webp",
      link: "/ads/table",
      price: 120,
      title: "Table",
    },
    {
      imgUrl: "/images/dame-jeanne.webp",
      link: "/ads/dame-jeanne",
      price: 75,
      title: "Dame Jeanne",
    },
    {
      imgUrl: "/images/bougie.webp",
      link: "/ads/bougie",
      price: 5,
      title: "Bougie",
    },
    {
      imgUrl: "/images/porte-magazine.webp",
      link: "/ads/porte-magazine",
      price: 15,
      title: "Porte magazine",
    },
    {
      imgUrl: "/images/vaisselier.webp",
      link: "/ads/vaisselier",
      price: 200,
      title: "Vaisselier",
    },
    {
      imgUrl: "/images/vide-poche.webp",
      link: "/ads/vide-poche",
      price: 10,
      title: "Botte",
    },
  ];

  
  return(
    <>
     <h2>Annonces récentes</h2>
          <section className="recent-ads">
      {
        ads.map(ad=>
            <AdCard
              title={ad.title}
              imgUrl={ad.imgUrl}
              link={ad.link}
              price={ad.price}
              key={ad.title}
            />
          )
      }
      </section>
    </>
  )
}
export default RecentAds


