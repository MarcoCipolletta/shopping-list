import { Component } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { iItem } from '../../interfaces/interfaces';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  isLoading = true;
  constructor(private firestoreSvc: FirestoreService) {}
  itemsToCheck: iItem[] = [];
  itemsChecked: iItem[] = [];
  ngOnInit() {
    this.firestoreSvc.listenToItems().subscribe((docs) => {
      this.itemsToCheck = docs.filter((item) => !item.checked);
      this.itemsChecked = docs.filter((item) => item.checked);
      this.isLoading = false;
    });
  }

  change(item: iItem) {
    this.firestoreSvc.updateItem(item);
  }
  delete(id: string) {
    this.firestoreSvc.deleteItem(id);
  }
}
