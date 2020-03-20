import { userRoutes } from './users';
import { categoryRoutes } from './categories';
import { articleRoutes } from './articles';

export const routes = [...userRoutes, ...categoryRoutes, ...articleRoutes];
