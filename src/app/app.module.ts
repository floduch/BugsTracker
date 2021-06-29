import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShowBugsComponent } from './show-bugs/show-bugs.component';
import { AddBugComponent } from './add/add.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
	declarations: [
		AppComponent,
		AddBugComponent,
		ShowBugsComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		ReactiveFormsModule,
		HttpClientModule,
		NoopAnimationsModule,
		DragDropModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
