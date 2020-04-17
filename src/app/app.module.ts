import {
  BrowserModule,
  BrowserTransferStateModule
} from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { environment } from "src/environments/environment";
import { AppComponent } from "./app.component";
import { translations, translationChunksConfig } from "@spartacus/assets";
import { B2cStorefrontModule, JsonLdBuilderModule } from "@spartacus/storefront";
import { MetaModule } from './meta.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: "serverApp" }),
    BrowserTransferStateModule,
    JsonLdBuilderModule,
    AppRoutingModule,
    MetaModule,
    B2cStorefrontModule.withConfig({
      backend: {
        occ: {
          baseUrl: environment.occBaseUrl
        }
      },
      context: {
        urlParameters: ["baseSite", "language", "currency"],
        baseSite: ["electronics-spa"]
      },
      i18n: {
        resources: translations,
        chunks: translationChunksConfig,
        fallbackLang: "en"
      },
      features: {
        level: "2.0",
        anonymousConsents: true
      },
      cmsComponents: {
        SearchBoxComponent: {
          component: 'assets/vue-components/vue-search-box.js#vue-search-box',
        },
      },
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
