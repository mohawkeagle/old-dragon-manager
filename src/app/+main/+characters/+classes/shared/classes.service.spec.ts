/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ClassesService } from './classes.service';

describe('ClassesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClassesService]
    });
  });

  it('should ...', inject([ClassesService], (service: ClassesService) => {
    expect(service).toBeTruthy();
  }));
});
