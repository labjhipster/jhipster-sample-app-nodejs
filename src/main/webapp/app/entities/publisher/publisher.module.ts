import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GenSharedModule } from 'app/shared/shared.module';
import { PublisherComponent } from './publisher.component';
import { PublisherDetailComponent } from './publisher-detail.component';
import { PublisherUpdateComponent } from './publisher-update.component';
import { PublisherDeleteDialogComponent } from './publisher-delete-dialog.component';
import { publisherRoute } from './publisher.route';

@NgModule({
  imports: [GenSharedModule, RouterModule.forChild(publisherRoute)],
  declarations: [PublisherComponent, PublisherDetailComponent, PublisherUpdateComponent, PublisherDeleteDialogComponent],
  entryComponents: [PublisherDeleteDialogComponent]
})
export class GenPublisherModule {}
