import { BagDrawer } from '@/components/BagDrawer';
import { BigLine } from '@/components/BigLine';
import { Faq } from '@/components/Faq';
import { Finale } from '@/components/Finale';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { HowTo } from '@/components/HowTo';
import { Press } from '@/components/Press';
import { Range } from '@/components/Range';
import { Ratings } from '@/components/Ratings';
import { Reasons } from '@/components/Reasons';
import { Story } from '@/components/Story';
import { Subscribe } from '@/components/Subscribe';

export default function Home() {
  return (
    <>
      <div className="announce">
        <div className="wrap"><span>Free shipping over $75</span><i /><span>Subscribe &amp; get 20% off</span></div>
      </div>
      <Header />
      <main id="top">
        <Hero />
        <Press />
        <Range />
        <HowTo />
        <Reasons />
        <Story />
        <BigLine />
        <Ratings />
        <Subscribe />
        <Faq />
        <Finale />
      </main>
      <Footer />
      <BagDrawer />
    </>
  );
}
