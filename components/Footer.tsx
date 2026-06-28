export default function Footer() {
  return (
    <footer className="bg-bg-secondary border-t border-border-light">
      <div className="px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-bold text-text-primary mb-4">OneShot</h3>
            <p className="text-text-secondary text-sm">
              Stop prompting. Start delegating.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-text-primary mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li><a href="#" className="hover:text-text-primary transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-text-primary transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-text-primary transition-colors">Examples</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-text-primary mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li><a href="#" className="hover:text-text-primary transition-colors">About</a></li>
              <li><a href="#" className="hover:text-text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-text-primary mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li><a href="#" className="hover:text-text-primary transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-text-primary transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border-light pt-8 text-center text-sm text-text-secondary">
          <p>&copy; 2024 OneShot. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
