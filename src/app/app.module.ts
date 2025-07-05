import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { environment } from '../environments/environment.development';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { AddItemComponent } from './components/add-item/add-item.component';
import { FooterComponent } from './components/footer/footer.component';
import { ListComponent } from './components/list/list.component';
import { NgIconsModule } from '@ng-icons/core';
import {
  iconoirNotes,
  iconoirShoppingBagPlus,
  iconoirTrash,
  iconoirPlus,
} from '@ng-icons/iconoir';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    AddItemComponent,
    FooterComponent,
    ListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    NgIconsModule.withIcons({
      iconoirNotes,
      iconoirShoppingBagPlus,
      iconoirTrash,
      iconoirPlus,
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
