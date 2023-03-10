import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConversaoComponent } from './conversao/conversao.component';
import { HistoricoComponent } from './historico/historico.component';
import { HomeComponent } from './home/home.component';
import { ListagemComponent } from './listagem/listagem.component';

const routes: Routes = [
  { path: "", component: HomeComponent},
  { path: "conversao", component: ConversaoComponent},
  { path: "listagem", component: ListagemComponent },
  { path: "historico", component: HistoricoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
