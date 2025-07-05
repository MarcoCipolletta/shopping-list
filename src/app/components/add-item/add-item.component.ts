import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirestoreService } from '../../services/firestore.service';
import { iItem } from './../../interfaces/interfaces';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-add-item',
  standalone: false,
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.scss',
})
export class AddItemComponent {
  constructor(private firestoreSvc: FirestoreService) {}

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    quantity: new FormControl(0),

    checked: new FormControl(false),
  });

  addItem() {
    if (this.form.invalid) return;
    this.firestoreSvc.addItem(this.form.value as Partial<iItem>);
    this.form.reset();
  }
}
