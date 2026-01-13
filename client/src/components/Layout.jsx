import NavbarApp from './NavbarApp'

export default function Layout ({children}){
    return(

        <div>
            <NavbarApp></NavbarApp>
            <div className="container py-4"> {children}</div>
        </div>

    );
}