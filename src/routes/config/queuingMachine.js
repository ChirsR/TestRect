import { lazy } from 'react';
import BlankLayout from '$pages/layouts/BlankLayout';
import Home from '$pages/container/Home';

const router = [
  {
    path: '/',
    layout: BlankLayout,
    component: Home,
  },
];

export default router;
