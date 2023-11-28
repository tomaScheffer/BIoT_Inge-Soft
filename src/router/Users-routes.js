import { Layout, List, AddEdit } from '@/views/users/Index.js';

export default {
    
    path: '/users',
    component: Layout,
    children: [
        { path: '', component: List },
        { path: 'add', component: AddEdit },
        { path: 'edit/:id', component: AddEdit }
    ]
};