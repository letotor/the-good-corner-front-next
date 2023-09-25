import Link from "next/link";
import Image from "next/image";

export type AdCardProps = {
  title: string;
  imgUrl: string;
  price: number;
  link: string;
};

const AdCard = ({ title, imgUrl, price, link } : AdCardProps) :React.ReactNode => {

  return (
    <div className="ad-card-container">
      <Link className="ad-card-link" href={link}>
        <Image className="ad-card-image" src={imgUrl} alt={title} quality={100} width="200" height="200"/>
        <div className="ad-card-text">
          <div className="ad-card-title">{title}</div>
          <div className="ad-card-price">{price} €</div>
        </div>
      </Link>
    </div>
  );
};

export default AdCard;
