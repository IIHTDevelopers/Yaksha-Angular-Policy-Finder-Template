import { Component } from '@angular/core';

export interface Policy {
  id: number;
  policyName: string;
  policyDescription: string;
  policyAmount: number;
  policyType: string;
}

@Component({
  selector: 'app-policy-finder',
  templateUrl: './policy-finder.component.html',
  styleUrls: ['./policy-finder.component.css']
})
export class PolicyFinderComponent {
  policies: Policy[] = [];
  newPolicy: Policy = {} as Policy;
  editedPolicy: Policy = {} as Policy;
  isEditing = false;
  searchKeyword = '';

  constructor() { }

  addPolicy(): void {
  }

  editPolicy(policy: Policy): void {
  }

  saveEditedPolicy(): void {
  }

  cancelEdit(): void {
  }

  deletePolicy(policy: Policy): void {
  }

  get filteredPolicies(): Policy[] {
    return [];
  }
}
