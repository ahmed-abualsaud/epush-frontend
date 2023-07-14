import '../assets/style/component/nav-toggler.css'

const NavToggler = () => {

    const handleClick = (e) => {
        e.stopPropagation()
        document.getElementById('sidebar').classList.toggle('nav-collapse')
        document.getElementById('content').classList.toggle('content-collapse')
    }

    return (
        <div className="nav-toggler" onClick={ handleClick }>
            <button type="button" id="sidebarCollapse">
                <i className="uil uil-bars"></i>
            </button>
        </div>
    )
}

export default NavToggler