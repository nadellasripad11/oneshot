import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 bg-bg-primary border-b border-border-light z-40">
      <div className="px-4 sm:px-6 lg:px-8 py-4 max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-accent">
          OneShot
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-text-secondary hover:text-text-primary transition-colors">
            Features
          </a>
          <a href="#examples" className="text-text-secondary hover:text-text-primary transition-colors">
            Examples
          </a>
          <a href="https://github.com/nadellasripad11/oneshot" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-text-primary transition-colors">
            Resources
          </a>
        </nav>
      </div>
    </header>
  );
}
