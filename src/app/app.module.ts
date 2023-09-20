import { NgModule, LOCALE_ID, DEFAULT_CURRENCY_CODE } from '@angular/core';
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { HttpClientModule } from '@angular/common/http';
import { provideEnvironmentNgxMask } from 'ngx-mask';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToolbarComponent } from './toolbar/toolbar.component';

import { AccountsModule } from './accounts/accounts.module';
import { TransactionsModule } from './transactions/transactions.module';

registerLocaleData(ptBr);

@NgModule({
    declarations: [AppComponent, ToolbarComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        AccountsModule,
        TransactionsModule,
    ],
    providers: [
        provideEnvironmentNgxMask(),
        {
            provide: LOCALE_ID,
            useValue: 'pt',
        },
        {
            provide: DEFAULT_CURRENCY_CODE,
            useValue: 'BRL',
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
