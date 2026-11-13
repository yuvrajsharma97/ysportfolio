export default function Nav() {
  return (
    <header className="nav" data-nav>
      <div className="container nav__bar">
        <a className="nav__mark" href="#main">Yuvraj Sharma</a>
        <nav aria-label="Sections">
          <ul className="nav__links">
            <li className="nav__hide-s"><a className="nav__link" href="#work">Work</a></li>
            <li className="nav__hide-s"><a className="nav__link" href="#experience">Experience</a></li>
            <li><a className="btn btn--sm" href="#contact">Get in touch</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
