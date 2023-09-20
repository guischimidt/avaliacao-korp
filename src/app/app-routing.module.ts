import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TransactionsComponent } from './transactions/transactions.component';

const routes: Routes = [
    { path: '', redirectTo: '/contas', pathMatch: 'full' },
    {
        path: 'pessoas',
        loadChildren: () =>
            import('./persons/persons.module').then((m) => m.PersonsModule),
    },
    {
        path: 'contas',
        loadChildren: () =>
            import('./accounts/accounts.module').then((m) => m.AccountsModule),
    },
    { path: 'transacoes', component: TransactionsComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
