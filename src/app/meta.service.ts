import { SeoMetaService } from '@spartacus/storefront';
import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { PageMetaService, PageMeta, PageRobotsMeta } from '@spartacus/core';
import { filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ExtendedSeoMetaService extends SeoMetaService {
  constructor(
    protected ngTitle: Title,
    protected ngMeta: Meta,
    protected pageMetaService: PageMetaService,
    private router: Router
  ) {
    super(ngTitle, ngMeta, pageMetaService);
  }
  protected set meta(meta: PageMeta) {
    this.title = meta.title;
    this.ogTitle = meta.heading || meta.title;
    this.description = meta.description;
    this.image = meta.image;
    this.ogUrl = this.router.url;
    this.robots = meta.robots || [PageRobotsMeta.INDEX, PageRobotsMeta.FOLLOW];
  }
  protected set image(imageUrl: string) {
    if (imageUrl) {
      this.addTag({ property: 'og:image', content: imageUrl });
    }
  }
  protected set ogTitle(heading: string) {
    if (heading) {
      this.addTag({ property: 'og:title', content: heading });
    }
  }
  protected set ogUrl(url: string) {
    if (url) {
      this.addTag({
        property: 'og:url',
        content: `${environment.baseUrl}/${url}`,
      });
    }
  }
  protected set description(value: string) {
    this.addTag({ name: 'description', content: value });
    this.addTag({ property: 'og:description', content: value });
  }
  init() {
    this.pageMetaService
      .getMeta()
      .pipe(filter(Boolean))
      .subscribe((meta: PageMeta) => (this.meta = meta));
    this.addTag({ name: 'twitter:card', content: 'summary' });
    this.addTag({ property: 'og:type', content: 'website' });
    if (environment.twitterId) {
      this.addTag({ name: 'twitter:site', content: environment.twitterId });
      this.addTag({ name: 'twitter:creator', content: environment.twitterId });
    }
    if (environment.facebookAppId) {
      this.addTag({
        property: 'fb:app_id',
        content: environment.facebookAppId,
      });
    }
  }
}
