import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Bug } from '../models/bug';

@Injectable({
	providedIn: 'root'
})
export class BugService {

	private _crudUrl: string = `https://crudcrud.com/api/${environment.crudToken}`;
	private _apiURL: string = `http://${environment.apiURL}`;

	constructor(private http: HttpClient) { }

	/**
	 * @description insert new bug
	 * @param bug
	 * @returns
	 */
	insertNewBug(bug: Bug): Observable<Bug> {
		return this.http.post<Bug>(`${this._apiURL}/bug`, bug);
	}

	/**
	 * @description get all bugs
	 * @returns all bugs
	 */
	getBugs$(): Observable<Bug[]>{
		return this.http.get<Bug[]>(`${this._apiURL}/bug`);
	}

	/**
	 * @description get bug by specific id
	 * @param id
	 * @returns specific bug
	 */
	getBugById$(id: string): Observable<Bug>{
		return this.http.get<Bug>(`${this._apiURL}/bug/${id}`);
	}

	/**
	 * @description delete a bug
	 * @param id
	 * @returns
	 */
	deleteBug$(id: number): Observable<boolean> {
		return this.http.delete<boolean>(`${this._apiURL}/bug/${id}`);
	}

	/**
	 * @description update a bug
	 * @param bug
	 * @returns
	 */
	updateBug$(bug: Bug): Observable<Bug> {
		const bugUpdated = {...bug};
		delete bugUpdated.id;
		return this.http.put<Bug>(`${this._apiURL}/bug/${bug.id}`, bugUpdated);
	}

}
