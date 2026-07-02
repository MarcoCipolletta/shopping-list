import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FirestoreService } from '../../services/firestore.service';
import { iItem } from '../../interfaces/interfaces';
import { DeleteCheckedItemsModalComponent } from '../delete-checked-items-modal/delete-checked-items-modal.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  isLoading = true;
  isDeletingChecked = false;
  constructor(
    private firestoreSvc: FirestoreService,
    private modalService: NgbModal
  ) {}
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

  async openDeleteCheckedModal() {
    const modalRef = this.modalService.open(DeleteCheckedItemsModalComponent, {
      centered: true,
    });
    modalRef.componentInstance.itemsCount = this.itemsChecked.length;

    try {
      const result = await modalRef.result;

      if (result !== 'confirm') {
        return;
      }
    } catch {
      return;
    }

    this.isDeletingChecked = true;
    try {
      await this.firestoreSvc.deleteItems(
        this.itemsChecked.map((item) => item.id)
      );
    } finally {
      this.isDeletingChecked = false;
    }
  }
}
