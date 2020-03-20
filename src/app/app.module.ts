import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment';
import { AppComponent } from './app.component';
import { translations, translationChunksConfig } from '@spartacus/assets';
import { B2cStorefrontModule } from '@spartacus/storefront';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    B2cStorefrontModule.withConfig({
      backend: {
        occ: {
          baseUrl: environment.occBaseUrl
        },
      },
      context: {
        urlParameters: ['baseSite', 'language', 'currency'],
        baseSite: ['electronics-spa'],
      },
      i18n: {
        resources: translations,
        chunks: translationChunksConfig,
        fallbackLang: 'en'
      },
      features: {
        level: '2.0',
        anonymousConsents: true
      }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
