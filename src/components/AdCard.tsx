import "./AdCard.module.css"
import Link from "next/link"
import Image from "next/image"
import { Category } from "@/components/Category"

export type AdCardProps = {
	title: string
	imgUrl: string
	price: number
	link: string
	category?: Category
}

const AdCard = ({
	title,
	imgUrl,
	price,
	link,
	category,
}: AdCardProps): React.ReactNode => {
	return (
		<div className='ad-card-container'>
			<Link className='ad-card-link' href={`/ad/${category?.id}`}>
				<Image
					className='ad-card-image'
					src={imgUrl}
					alt={title}
					quality={100}
					width='200'
					height='200'
				/>
				<div className='ad-card-main'>
					<div className='ad-card-text'>
						<div className='ad-card-title'>{title}</div>
						<div className='ad-card-price'>{price} €</div>
					</div>
					<div className='ad-card-category'>
						{category ? category.name : ""}
					</div>
				</div>
			</Link>
		</div>
	)
}

export default AdCard
