import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Bug, BugStatusEnum } from '../@shared/models/bug';
import { BugService } from '../@shared/services/bug.service';

@Component({
	selector: 'app-add',
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.scss']
})
export class AddBugComponent implements OnInit {

	addBugForm: FormGroup;
	private _isEditMode: boolean = false;
	bug: Bug;

	private _status: string = "";
	get status() {
		return this._status;
	}
	set status(newStatus: string) {
		this._status = newStatus;
	}

	constructor(
		private fb: FormBuilder,
		private route: ActivatedRoute,
		private bugService: BugService
	) {
		this.createForm();

		const bugId = this.route.snapshot.paramMap.get("id");

		if (bugId) {
			this._isEditMode = true;

			this.getBug(bugId);
		}

	}

	private getBug(id: string) {
		this.bugService.getBugById$(id).subscribe({
			next: (bug: Bug) => {
				this.bug = bug;
				this.addBugForm.patchValue({
					title: this.bug.title,
					description: this.bug.description
				})
			},
			error: () => {
				this._status = "Erreur";
			}
		});
	}

	private createForm() {
		this.addBugForm = this.fb.group({
			title: ['', [Validators.required, Validators.minLength(3)]],
			description: ['', Validators.required]
		});
	}

	ngOnInit(): void {
	}

	create() {
		const title = this.addBugForm.get("title")?.value;
		const description = this.addBugForm.get("description")?.value;

		if (this._isEditMode) {
			this.bug.title = title;
			this.bug.description = description;
			this.bugService.updateBug$(this.bug)
				.subscribe({
					next: () => {
						this._status = `Bug ${this.bug.title} modifié !`;
					}
				});
		} else {

			const bug: Partial<Bug> = {
				title: title,
				description: description,
				status: BugStatusEnum.Open
			};
			this.bugService.insertNewBug(bug as Bug)
				.subscribe({
					next: () => {
						this._status = `Bug ${bug.title} ajouté !`;
					}
				});
		}
	}

}
