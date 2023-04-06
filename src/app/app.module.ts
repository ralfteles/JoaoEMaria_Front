import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NewProdutoComponent } from './pages/produto/new-produto/new-produto.component';
import { ListProdutoComponent } from './pages/produto/list-produto/list-produto.component';
import { EditProdutoComponent } from './pages/produto/edit-produto/edit-produto.component';
import { ListVendaComponent } from './pages/venda/list-venda/list-venda.component';
import { NewVendaComponent } from './pages/venda/new-venda/new-venda.component';
import { EditVendaComponent } from './pages/venda/edit-venda/edit-venda.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { LogentradaComponent } from './pages/logentrada/logentrada.component';
import { MenuComponent } from './pages/menu/menu.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NewProdutoComponent,
    ListProdutoComponent,
    EditProdutoComponent,
    ListVendaComponent,
    NewVendaComponent,
    EditVendaComponent,
    LogentradaComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    Ng2SearchPipeModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
