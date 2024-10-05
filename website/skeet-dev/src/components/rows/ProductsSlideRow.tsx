'use client'

import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import ProductsElsolRow from './products/ProductsElsolRow'
import ProductsErpcRow from './products/ProductsErpcRow'
import ProductsSolvRow from './products/ProductsSolvRow'
import ProductsValidatorsSolutionsRow from './products/ProductsValidatorsSolutionsRow'
import { cn } from '@/lib/utils'

export default function ProductsSlideRow() {
  return (
    <>
      <Carousel
        plugins={[
          Autoplay({
            delay: 6400,
          }),
        ]}
        className={cn(
          'h-[896px] w-full hover:cursor-grab active:cursor-grabbing sm:h-[1152px]',
          'bg-gradient-to-b from-white via-zinc-100 to-white',
          'dark:from-zinc-950 dark:via-indigo-950 dark:to-zinc-950',
        )}
      >
        <CarouselContent>
          <CarouselItem>
            <ProductsSolvRow />
          </CarouselItem>
          <CarouselItem>
            <ProductsValidatorsSolutionsRow />
          </CarouselItem>
          <CarouselItem>
            <ProductsElsolRow />
          </CarouselItem>
          <CarouselItem>
            <ProductsErpcRow />
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </>
  )
}
