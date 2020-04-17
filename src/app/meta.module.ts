import { NgModule } from '@angular/core';
import { SeoMetaService } from '@spartacus/storefront';
import { ExtendedSeoMetaService } from './meta.service';



@NgModule({
  declarations: [],
  imports: [  ],
  providers: [
    {
      provide: SeoMetaService,
      useClass: ExtendedSeoMetaService
    }
  ],
  bootstrap: []
})
export class MetaModule {}
