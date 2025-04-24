import { Component } from '@angular/core';
import { FirestoreService } from './services/firestore.service';
import { iItem } from './interfaces/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private firestoreSvc: FirestoreService) {}
  itemsToCheck: iItem[] = [];
  itemsChecked: iItem[] = [];
  ngOnInit() {
    this.firestoreSvc.listenToItems().subscribe((docs) => {
      this.itemsToCheck = docs.filter((item) => !item.checked);
      this.itemsChecked = docs.filter((item) => item.checked);
    });
  }

  change(item: iItem) {
    this.firestoreSvc.updateItem(item);
  }
  delete(id: string) {
    this.firestoreSvc.deleteItem(id);
  }
}
