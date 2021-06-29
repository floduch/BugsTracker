import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBugComponent } from './add/add.component';
import { ShowBugsComponent } from './show-bugs/show-bugs.component';

const routes: Routes = [
	{
		path: "add",
		component: AddBugComponent
	},
	{
		path: "add/:id",
		component: AddBugComponent
	},
	{
		path: "show",
		component: ShowBugsComponent
	},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
