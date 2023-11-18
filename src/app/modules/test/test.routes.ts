import { Route } from '@angular/router';
import { TestComponent } from './pages/test/test.component';
import { CreateTestComponent } from './pages/create-test/create-test.component';

export const testsRoutes: Route[] = [
  {
    path: ':offerId',
    title: 'ABC Jobs | Test',
    component: TestComponent,
  },
  {
    path: 'create/:offerId',
    title: 'ABC Jobs | CreateTest',
    component: CreateTestComponent,
  },
];
