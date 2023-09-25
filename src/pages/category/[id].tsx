import { useRouter } from "next/router";

function CategoryPage() {
  const router = useRouter();
  const { id } = router.query; // Accédez au paramètre 'id' de l'URL

  return (
    <div>
      <h1>Catégorie {id}</h1>
      {/* Votre contenu de page */}
    </div>
  );
}

export default CategoryPage;
