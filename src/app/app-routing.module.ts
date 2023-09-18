import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PersonsComponent } from './persons/persons.component';
import { AccountsComponent } from './accounts/accounts.component';

const routes: Routes = [
    { path: '', redirectTo: '/pessoas', pathMatch: 'full' },
    { path: 'pessoas', component: PersonsComponent },
    { path: 'contas', component: AccountsComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
