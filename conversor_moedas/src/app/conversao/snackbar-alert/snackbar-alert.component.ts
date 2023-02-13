import { Component,inject } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar-alert',
  templateUrl: './snackbar-alert.component.html',
  styleUrls: ['./snackbar-alert.component.scss']
})
export class SnackbarAlertComponent {
  snackBarRef = inject(MatSnackBarRef);
}
