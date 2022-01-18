import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
    exports: [
        MatCardModule,
        MatIconModule,
        MatListModule,
        FlexLayoutModule,
        MatSelectModule,
        MatFormFieldModule


    ],
    providers: [],
})
export class MaterialModule { }