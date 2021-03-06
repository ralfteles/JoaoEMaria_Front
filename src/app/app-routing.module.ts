import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { NewProdutoComponent } from './pages/produto/new-produto/new-produto.component';
import { EditProdutoComponent } from './pages/produto/edit-produto/edit-produto.component';
import { NewVendaComponent } from './pages/venda/new-venda/new-venda.component';
import { EditVendaComponent } from './pages/venda/edit-venda/edit-venda.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'addProduto', component: NewProdutoComponent },
  { path: 'editProduto/:id', component: EditProdutoComponent },
  { path: 'addVenda', component: NewVendaComponent },
  { path: 'editVenda/:id', component: EditVendaComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
