import ArtistPortfolio from '~/components/ArtistPortfolio/ArtistPortfolio'
import PageContainer from '~/components/PageContainer'
import {
  getArtistById,
  getArtists,
} from '~/lib/sanity/queries/sanity.artistsQuery'
import { getClient } from '~/lib/sanity/sanity.client'

export const generateStaticParams = async () => {
  const client = getClient(undefined)
  const artists = await getArtists(client)
  return artists.map((artist) => ({ id: artist._id }))
}

const ArtistPortfolioPage = async ({ params }: { params: { id: string } }) => {
  const client = getClient(undefined)
  const artist = await getArtistById(client, decodeURI(params.id))

  if (!artist) return <div>404</div>

  return (
    <PageContainer>
      <ArtistPortfolio artist={artist} />
    </PageContainer>
  )
}

export default ArtistPortfolioPage
