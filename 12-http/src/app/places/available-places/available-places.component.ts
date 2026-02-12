import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';

import { PlacesService } from '../places.service';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  places = signal<Place[] | undefined>(undefined);
  isFetching = signal(false);
  error = signal<string | null>(null);
  private placesService = inject(PlacesService);
  destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.isFetching.set(true);
    const subscription = this.placesService.loadAvailablePlaces().subscribe({
      next: (places) => {
        this.places.set(places);
      },
      error: (error: Error) => {
        console.log('error', error);
        this.error.set(error.message);
      },
      complete: () => {
        this.isFetching.set(false);
      },
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  // ngOnInit(): void {
  //   this.isFetching.set(true);
  //   const url = 'http://localhost:3000/places';
  //   const subscription = this.http
  //     .get<{ places: Place[] }>(url)
  //     .pipe(
  //       map((resData) => resData.places),
  //       //sometime we can do this but no need to do this here
  //       catchError((error) => {
  //         console.log('error into pipe', error);
  //         return throwError(() => new Error('something went wrong'));
  //       }),
  //     )
  //     .subscribe({
  //       next: (places) => {
  //         this.places.set(places);
  //       },
  //       error: (error: Error) => {
  //         console.log('error', error);
  //         this.error.set(error.message);
  //       },
  //       complete: () => {
  //         this.isFetching.set(false);
  //       },
  //     });

  //   this.destroyRef.onDestroy(() => {
  //     subscription.unsubscribe();
  //   });
  // }

  // ngOnInit(): void {
  //   this.isFetching.set(true);
  //   const url = 'http://localhost:3000/places';
  //   const subscription = this.http.get<{places:Place[]}>(url ).subscribe({
  //     next: (resData) => {
  //       this.places.set(resData.places)
  //     },
  //     complete : () =>{
  //       this.isFetching.set(false);
  //     }
  //   });

  //   this.destroyRef.onDestroy(() => {
  //     subscription.unsubscribe();
  //   });
  // }

  onSelectPlace(selectedPlace: Place) {
   const subscription = this.placesService.addPlaceToUserPlaces(selectedPlace).subscribe({
      next: (resData) => {
        console.log('place selected successfully', resData);
      },
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
