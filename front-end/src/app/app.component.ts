import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // For ngModel
import { CommonModule } from '@angular/common';  // For *ngIf
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, RouterOutlet, RouterLink, RouterLinkActive]
})
export class AppComponent {

}
