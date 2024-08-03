import { Link, LinkProps, useLocation } from 'react-router-dom'

export interface NavLinkPropsInterface extends LinkProps {}

export function NavLink(props: NavLinkPropsInterface) {
    const { pathname } = useLocation()

    return (
        <Link
            data-current={pathname === props.to}
            {...props}
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground data-[current=true]:text-foreground"
        />
    )
}
