import { groq } from 'next-sanity'
import { SanityClient } from 'sanity'

import {
  AftercareInfoPageContent,
  ArtistsPageContent,
  BookingInfoPageContent,
  FaqPageContent,
  RootPageContent,
} from '~/types/SanitySchemaTypes'

const rootPageContentQuery = groq`*[_type == "rootPageContent"][0]`
export async function getRootPageContent(
  client: SanityClient,
): Promise<RootPageContent> {
  return await client.fetch(rootPageContentQuery)
}

// answer is the bloc content field, which is inside of the faqs array
const faqPageContentQuery = groq`*[_type == "faqPageContent"][0]{
  ...,
  faqs[]{
    ...,
    answer[]{
      ...,
      _type == "image" => {
        ...,
        asset->
      }
    }
  }
}`
export async function getFaqPageContent(
  client: SanityClient,
): Promise<FaqPageContent> {
  return await client.fetch(faqPageContentQuery)
}

// information is the block content field
// within that field, there can be images that we need to get the asset for
const aftercareInfoPageContentQuery = groq`*[_type == "aftercareInfoPageContent"][0]{
  ...,
  information[]{
    ...,
    _type == "image" => {
      ...,
      asset->
    }
  }
}`
export async function getAftercareInfoPageContent(
  client: SanityClient,
): Promise<AftercareInfoPageContent> {
  return await client.fetch(aftercareInfoPageContentQuery)
}

const artistsPageContentQuery = groq`*[_type == "artistsPageContent"][0]`
export async function getArtistsPageContent(
  client: SanityClient,
): Promise<ArtistsPageContent> {
  return await client.fetch(artistsPageContentQuery)
}

const bookingInfoPageContentQuery = groq`*[_type == "bookingInfoPageContent"][0]{
  ...,
  information[]{
    ...,
    _type == "image" => {
      ...,
      asset->
    }
  }
}`
export async function getBookingInfoPageContent(
  client: SanityClient,
): Promise<BookingInfoPageContent> {
  return await client.fetch(bookingInfoPageContentQuery)
}
