import { Button, Container, Overlay, Text, Title } from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'

import { Base64heroImage } from '~/utils'
import { NavigationPages } from '~/utils/navigation'

import classes from './Hero.module.css'

interface IHero {
  title: string
  description?: string
}

const Hero = ({ title, description }: IHero) => {
  return (
    <div className={classes.hero}>
      <Overlay
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
        opacity={1}
        zIndex={1}
      />
      <Image
        className={classes.heroImage}
        src="/tattoo-shop.jpg"
        alt="Picture of shop"
        fill
        sizes="100vw"
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
        }}
        placeholder="blur"
        blurDataURL={Base64heroImage}
      />
      <Container className={classes.container} size="md">
        <Title className={classes.title}>{title}</Title>
        {description ? (
          <Text className={classes.description} size="xl" mt="xl">
            {description}
          </Text>
        ) : undefined}

        <Link href={NavigationPages.Artists}>
          <Button
            variant="gradient"
            size="xl"
            radius="xl"
            className={classes.control}
          >
            View Our Artists
          </Button>
        </Link>
      </Container>
    </div>
  )
}

export default Hero
