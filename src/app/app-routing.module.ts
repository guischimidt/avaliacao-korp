import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: '/pessoas', pathMatch: 'full' },

    //Lazy load com rotas filhas
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
    {
        path: 'transacoes',
        loadChildren: () =>
            import('./transactions/transactions.module').then(
                (m) => m.TransactionsModule
            ),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
