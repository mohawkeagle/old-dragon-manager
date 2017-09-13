import { ChangeDetectorRef, Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';

import { Campaign } from '../../../../shared/entities/campaign';
import { CampaignJournal } from '../../../../shared/entities/campaign-journal';
import { CampaignService } from "../shared/campaign.service";

@Component({
  selector: 'campaign-journals',
  templateUrl: './campaign-journals.component.html',
  styleUrls: ['./campaign-journals.component.scss']
})
export class CampaignJournalsComponent implements OnInit {

  @Input('campaignForm') campaignForm: FormGroup;
  @Input('journals') journals: CampaignJournal[];
  private journalForm: FormGroup;
  private enabledEditing: Boolean;

  constructor(
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private campaignService: CampaignService
  ) { }

  ngOnInit() {
    this.campaignForm.addControl('journals', new FormArray([]));
    this.campaignService.editingEmitter.subscribe((status) => {
      console.log("Mudou status de edição nos diários", status);
      this.enabledEditing = status.editing;
    });
  }

  /**
   * Adds a new journal in the campaign
   */
  addJournal() {
    const child: CampaignJournal = {
      title: '',
      description: ''
    };
    this.journals.push(child);
    this.changeDetectorRef.detectChanges();
  }

  /**
   * Verifica se o usuário atual pode editar a campanha
   * @return {boolean} Resultado da verificação
   */
  canEdit(): boolean {
    return this.campaignService.canEdit();
  }

  /**
   * Removes a journal by its index
   * @param {CampaignJournal} journal Journal entity
   */
  removeJournal(journal: CampaignJournal) {
    if (this.journals.length) {
      let index = this.journals.indexOf(journal);
      if (index >= 0) {
        this.journals.splice(index, 1);
        (<FormArray>this.campaignForm.get('journals')).removeAt(index);
      }
    }
  }
}
