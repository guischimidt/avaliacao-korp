import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';

import { MessagesComponent } from './messages.component';

@NgModule({
    declarations: [MessagesComponent],
    imports: [CommonModule, MatIconModule],
    exports: [MessagesComponent],
})
export class MessagesModule {}
