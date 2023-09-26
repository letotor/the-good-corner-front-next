import { useRouter } from "next/router"
import AdCard from "@/components/AdCard"
function CategoryPage() {
	const router = useRouter()
	const { id } = router.query // Accédez au paramètre 'id' de l'URL

	return (
		<div>
			<AdCard
				imgUrl=''
				link=''
				title=''
				price={0}
				// category={{ id: id, name = "" }}
				// key={id}
			/>
		</div>
	)
}

export default CategoryPage
