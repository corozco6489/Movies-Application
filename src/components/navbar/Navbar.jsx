export default function Navbar(props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Movies Application
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
          <form className="d-flex">
            <input
              className="form-control me-2 d-flex"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={props.value}
              onChange={(event) => props.setSearchValue(event.target.value)}

            />
       
          </form>
        </div>
      </div>
    </nav>
  );
}
