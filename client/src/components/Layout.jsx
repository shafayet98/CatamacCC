import NavbarApp from './NavbarApp'

export default function Layout ({children}){
    return(

        <div>
            {/* navbar */}
            <NavbarApp></NavbarApp>
            {/* all the other things */}
            <div className="container py-4"> {children}</div>
        </div>

    );
}