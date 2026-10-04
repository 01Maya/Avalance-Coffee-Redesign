import { Logo, Ridges } from './Icons';
import { Reveal } from './Reveal';
import { SITE } from '@/lib/data';

export function Footer() {
  return (
    <footer>
      <Ridges />
      <div className="wrap">
        <div className="foot-grid">
          <Reveal i={0}>
            <Logo label="Avalanche Coffee, back to top" />
            <p className="foot-about">Stay caffeinated, stay connected. Find us on Instagram, Facebook and TikTok @avalanchecoffee.</p>
          </Reveal>
          <Reveal i={1}>
            <h3>Collections</h3>
            <ul>
              <li><a href="#range">Cafe Style</a></li>
              <li><a href={`${SITE}/collections/instant-chai-tea-sachets`}>Chai Tea</a></li>
            </ul>
          </Reveal>
          <Reveal i={2}>
            <h3>Links</h3>
            <ul>
              <li><a href="#range">Shop</a></li>
              <li><a href="#subscribe">Subscriptions</a></li>
              <li><a href="#story">About</a></li>
              <li><a href="#faq">Contact</a></li>
            </ul>
          </Reveal>
          <Reveal i={3}>
            <h3>Follow us</h3>
            <ul>
              <li><a href="https://www.instagram.com/avalanchecoffee/">Instagram</a></li>
              <li><a href="https://facebook.com/avalanchecoffee">Facebook</a></li>
              <li><a href="https://www.tiktok.com/@avalanchecoffee?lang=en">TikTok</a></li>
            </ul>
          </Reveal>
        </div>
        <div className="foot-base">
          <span>© Avalanche Coffee. Redesign concept.</span>
          <div>
            <a href="/terms">T&amp;Cs</a>
            <a href="/policy">Privacy policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
