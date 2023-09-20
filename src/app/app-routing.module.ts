import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountsComponent } from './accounts/accounts.component';
import { TransactionsComponent } from './transactions/transactions.component';

const routes: Routes = [
    { path: '', redirectTo: '/contas', pathMatch: 'full' },
    {
        path: 'pessoas',
        loadChildren: () =>
            import('./persons/persons.module').then((m) => m.PersonsModule),
    },
    { path: 'contas', component: AccountsComponent },
    { path: 'transacoes', component: TransactionsComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
