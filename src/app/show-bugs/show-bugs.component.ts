import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bug, BugStatusEnum } from '../@shared/models/bug';
import { BugService } from '../@shared/services/bug.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';


@Component({
	selector: 'app-show-bugs',
	templateUrl: './show-bugs.component.html',
	styleUrls: ['./show-bugs.component.scss']
})
export class ShowBugsComponent implements OnInit {

	bugArray: Bug[] = [];
	bugStatusEnum = BugStatusEnum;

	openBugArray: Bug[] = [];
	inProgressBugArray: Bug[] = [];
	closeBugArray: Bug[] = [];

	constructor(
		private bugService: BugService,
		private routeur: Router
	) {
		this.bugService.getBugs$()
			.subscribe({
				next: (bugs: Bug[]) => {
					this.bugArray = bugs;
					this.openBugArray = bugs.filter(b => b.status === BugStatusEnum.Open);
					this.inProgressBugArray = bugs.filter(b => b.status === BugStatusEnum.InProgress);
					this.closeBugArray = bugs.filter(b => b.status === BugStatusEnum.Fixed);
				}
			})
	}

	ngOnInit() {
	}


	deleteBug(idBug: number) {

		this.bugService.deleteBug$(idBug)
			.subscribe({
				next: () => {
					console.log("Bug supprimé");
					this.reloadCurrentRoute();
				}
			})
	}

	drop(event: CdkDragDrop<Bug[]>) {
		const bug = event.previousContainer.data[event.previousIndex];
		let newStatus: BugStatusEnum = event.container.element.nativeElement.getAttribute('status') as BugStatusEnum;

		bug.status = newStatus;

		if (event.previousContainer === event.container) {
			moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
		} else {
			transferArrayItem(event.previousContainer.data,
				event.container.data,
				event.previousIndex,
				event.currentIndex);
		}

		this.bugService.updateBug$(bug)
			.subscribe({
				next: (updatedBug: Bug) => {

				}, error: () => {
					if (event.previousContainer === event.container) {
						transferArrayItem(event.previousContainer.data,
							event.container.data,
							event.previousIndex,
							event.currentIndex);
					} else {
						moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
					}
				}
			})
	}

	reloadCurrentRoute() {
		let currentUrl = this.routeur.url;
		this.routeur.navigateByUrl('/', { skipLocationChange: true }).then(() => {
			this.routeur.navigate([currentUrl]);
		});
	}

}
