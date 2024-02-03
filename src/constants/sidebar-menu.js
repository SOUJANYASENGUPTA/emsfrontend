import DashboardIcon from '../assets/icons/dashboard.svg';
import ShippingIcon from '../assets/icons/shipping.svg';
import ProductIcon from '../assets/icons/product.svg';
import UserIcon from '../assets/icons/user.svg';

const sidebar_menu = [
    {
        id: 1,
        icon: DashboardIcon,
        path: '/dashboard',
        title: 'Dashboard',
    },
    {
        id: 2,
        icon: UserIcon,
        path: '/users',
        title: 'Users',
    },
    {
        id: 3,
        icon: ShippingIcon,
        path: '/events',
        title: 'Events',
    },
    
    /* {
        id: 6,
        icon: UserIcon,
        path: '/appointment',
        title: 'Appointments',
    },
    {
        id: 7,
        icon: UserIcon,
        path: '/billing',
        title: 'Billing',
    } */
   
]

export default sidebar_menu;