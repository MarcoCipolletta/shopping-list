import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-checked-items-modal',
  templateUrl: './delete-checked-items-modal.component.html',
})
export class DeleteCheckedItemsModalComponent {
  @Input() itemsCount = 0;

  constructor(public activeModal: NgbActiveModal) {}
}
