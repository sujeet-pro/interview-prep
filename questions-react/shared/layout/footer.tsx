const currentYear = new Date().getFullYear()
export function Footer() {
  return (
    <footer className="footer sm:footer-horizontal footer-center bg-base-200 text-base-content p-4">
      <aside>
        <p>Copyright © {currentYear} - All right reserved by Sujeet Jaiswal</p>
      </aside>
    </footer>
  )
}
