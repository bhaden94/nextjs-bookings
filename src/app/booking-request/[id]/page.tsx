import BookStatuses from '~/components/BooksStatus/BookStatuses'
import PageContainer from '~/components/PageContainer'
import PageTitle from '~/components/PageTitle/PageTitle'
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

const ArtistBookingRequestPage = async ({
  params,
}: {
  params: { id: string }
}) => {
  const client = getClient(undefined)
  const artist = await getArtistById(client, decodeURI(params.id))

  if (!artist) return <PageContainer>404</PageContainer>

  return (
    <PageContainer>
      <PageTitle title={`Booking with ${artist.name}`} />
      <BookStatuses artists={[artist]} showForm />
    </PageContainer>
  )
}

export default ArtistBookingRequestPage
