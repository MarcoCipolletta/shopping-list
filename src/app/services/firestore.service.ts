import { inject, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  collection,
  Firestore,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  collectionData,
} from '@angular/fire/firestore';

import { iItem } from '../interfaces/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private firestore = inject(Firestore);
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  listenToItems() {
    const colRef = collection(this.firestore, 'items');
    return collectionData(colRef, { idField: 'id' }) as Observable<iItem[]>;
  }

  async addItem(item: Partial<iItem>): Promise<void> {
    try {
      const docRef = await addDoc(collection(this.firestore, 'items'), item);
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  async deleteItem(id: string): Promise<void> {
    try {
      await deleteDoc(doc(this.firestore, `items/${id}`));
      console.log('Document successfully deleted!');
    } catch (e) {
      console.error('Error removing document: ', e);
    }
  }

  async updateItem(item: iItem): Promise<void> {
    try {
      const updatedItem = { ...item, checked: !item.checked };
      await updateDoc(doc(this.firestore, `items/${item.id}`), updatedItem);
      console.log('Document successfully updated!');
    } catch (e) {
      console.error('Error updating document: ', e);
    }
  }
}
