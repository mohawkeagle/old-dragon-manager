import { Subscription } from 'rxjs/Subscription';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MarkdownService } from 'angular2-markdown';

import { AuthenticationService } from '../../../../../authentication/authentication.service';
import { Campaign } from '../../../../../shared/entities/campaign';
import { CampaignPage } from '../../../../../shared/entities/campaign-page';
import { CampaignsService } from '../../../shared/campaigns.service';
import { CampaignPagesService } from '../shared/campaign-pages.service';

@Component({
  selector: 'campaign-page',
  templateUrl: './campaign-page.component.html',
  styleUrls: ['./campaign-page.component.scss']
})
export class CampaignPageComponent implements OnInit, OnDestroy {

  campaign: Campaign;
  page: CampaignPage;
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
    private campaignsService: CampaignsService,
    private campaignPagesService: CampaignPagesService
  ) { }

  compileText(text: string) {
    return this.campaignPagesService.compileText(text, this.isCampaignOwner());
  }

  /**
   * Verifica se o usuário atual é o mestre de jogo da campanha
   * @return {boolean} Resultado da verificação
   */
  isCampaignOwner(): boolean {
    return this.authService.isCurrentUser(this.campaign.dungeonMaster);
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.route.parent.parent.parent.params.subscribe((params) => {
      let campaign_id = params['campaign_id'];
      this.campaignsService.find(campaign_id).subscribe((campaign) => {
        this.campaign = campaign;
        this.route.params.subscribe((childParams) => {
          let page_id = childParams['page_id'];
          if (campaign_id && page_id) {
            this.subscription = this.campaignPagesService
            .findChild(campaign_id, page_id).subscribe((response) => {
              this.page = response;
            });
          }
          this.route.fragment.subscribe ((fragment) => {
            const element = document.querySelector(`#${fragment}`);
            if (element) element.scrollIntoView (element);
          });
        });
      });
    });
  }

}
