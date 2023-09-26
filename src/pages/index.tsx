import Layout  from "@/components/Layout"
import  RecentAds  from "@/components/RecentAds"

export default function Home(): React.ReactNode {
	return (
		<Layout title='Home'>
			<RecentAds />
		</Layout>
	)
}
