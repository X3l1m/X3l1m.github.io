export default function Footer() {
  return (
    <footer className="border-t border-border px-6 py-8">
      <div className="mx-auto flex max-w-5xl items-center justify-between text-xs text-muted">
        <span>&copy; {new Date().getFullYear()} Selim Yildirim</span>
        <span>Built with Next.js</span>
      </div>
    </footer>
  );
}
