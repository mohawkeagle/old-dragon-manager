import { EventEmitter, Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';

import { Character } from '../../../../../../shared/entities/character';

@Component({
  selector: 'campaign-form-character',
  templateUrl: './campaign-form-character.component.html',
  styleUrls: ['./campaign-form-character.component.scss']
})
export class CampaignFormCharacterComponent implements OnInit {

  @Input('character') character: Character;
  @Input('characters') characters: FormArray;
  @Output('removeCharacter') removeCharacter: EventEmitter<Character>;
  private characterForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.removeCharacter = new EventEmitter();
  }

  ngOnInit() {
    this.characterForm = this.toFormGroup(this.character);
    this.characters.push(this.characterForm);
  }

  /**
   * Emite evento de remoção
   */
  remove() {
    this.removeCharacter.emit(this.character);
  }

  /**
   * Cria um novo FormGroup para o personagem
   * @param  {Character} character Personagem
   * @return {FormGroup}           Novo FormGroup
   */
  toFormGroup(character: Character): FormGroup {
    return this.formBuilder.group({
      id: [ character.id ]
    });
  }
}