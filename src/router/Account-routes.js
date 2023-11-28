import { Layout, Login, Register } from '@/views/account/Index.js';

export default {
    
    path: '/account',
    component: Layout,
    children: [
        { path: '', redirect: 'login' },
        { path: 'login', component: Login },
        { path: 'register', component: Register }
    ]
};