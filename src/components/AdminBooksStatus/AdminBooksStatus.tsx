'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Group, Radio } from '@mantine/core'
import { DateTimePicker, DateValue } from '@mantine/dates'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { BooksStatus } from '~/lib/sanity/queries/sanity.artistsQuery'
import {
  BooksStatusField,
  booksStatusSchema,
  TBooksStatusSchema,
} from '~/utils/booksStatusUtils'

interface IAdminBooksStatus {
  artistId: string
  booksStatus: BooksStatus
}

const AdminBooksStatus = ({ artistId, booksStatus }: IAdminBooksStatus) => {
  const { register, handleSubmit, formState, setValue } =
    useForm<TBooksStatusSchema>({ resolver: zodResolver(booksStatusSchema) })

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [booksOpen, setBooksOpen] = useState<boolean>(booksStatus.booksOpen)
  const [booksOpenAt, setBooksOpenAt] = useState<DateValue>(null)

  useEffect(() => {
    register(BooksStatusField.BooksOpen)
    register(BooksStatusField.BooksOpenAt)
    setValue(BooksStatusField.BooksOpen, booksStatus.booksOpen)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setBooksOpenAt(new Date(booksStatus.booksOpenAt!))
  }, [booksStatus])

  const onSubmit: SubmitHandler<TBooksStatusSchema> = async (data) => {
    setIsSubmitting(true)

    const response = await fetch('/api/sanity/artist', {
      method: 'PATCH',
      body: JSON.stringify({
        booksOpen: data.booksOpen,
        booksOpenAt: data.booksOpenAt,
        artistId: artistId,
      }),
    })
    // TODO: handle errors

    if (response.ok) {
      setBooksOpen(data.booksOpen || false)
      setBooksOpenAt(data.booksOpenAt || null)
    }

    setIsSubmitting(false)
  }

  const onBooksOpenChange = (value: string) => {
    const booksOpen = value === 'open'
    setValue(BooksStatusField.BooksOpen, booksOpen)
    setBooksOpen(booksOpen)
  }

  const onBooksOpenAtChange = (date: DateValue) => {
    setValue(BooksStatusField.BooksOpenAt, date || undefined)
    setBooksOpenAt(date)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Radio.Group
        value={booksOpen ? 'open' : 'closed'}
        name="booksOpen"
        label="Books Open"
        onChange={onBooksOpenChange}
        error={formState.errors.booksOpen?.message}
      >
        <Group mt="xs">
          <Radio value="open" label="Open" />
          <Radio value="closed" label="Closed" />
        </Group>
      </Radio.Group>
      <DateTimePicker
        name="booksOpenAt"
        value={booksOpenAt}
        valueFormat="DD MMM YYYY hh:mm A"
        onChange={onBooksOpenAtChange}
        label="Books open at"
        placeholder="When will your books open again?"
        error={formState.errors.booksOpenAt?.message}
      />
      <Button variant="filled" type="submit" loading={isSubmitting}>
        Update Books
      </Button>
    </form>
  )
}

export default AdminBooksStatus
