import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { PolicyFinderComponent } from './policy-finder.component';

describe('PolicyFinderComponent', () => {
  let component: PolicyFinderComponent;
  let fixture: ComponentFixture<PolicyFinderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PolicyFinderComponent],
      imports: [FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('boundary', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should have form fields for adding a policy', () => {
      const compiled = fixture.nativeElement;
      const formFields = compiled.querySelectorAll('form input');
      expect(formFields.length).toBe(4); // Check for the number of input fields
    });

    it('should have a button for adding a policy', () => {
      const compiled = fixture.nativeElement;
      const addButton = compiled.querySelector('form button[type="submit"]');
      expect(addButton.textContent).toContain('Add Policy');
    });

    it('should display search input for filtering policies', () => {
      const compiled = fixture.nativeElement;
      const searchInput = compiled.querySelector('div:nth-child(3) input[type="text"]');
      expect(searchInput).toBeTruthy();
    });

    it('should display edit policy form when editing a policy', () => {
      component.isEditing = true;
      fixture.detectChanges();
      const compiled = fixture.nativeElement;
      const editForm = compiled.querySelector('div:nth-child(5) form');
      expect(editForm).toBeTruthy();
      const saveButton = editForm.querySelector('button[type="submit"]');
      const cancelButton = editForm.querySelector('button[type="button"]');
      expect(saveButton.textContent).toContain('Save');
      expect(cancelButton.textContent).toContain('Cancel');
    });

    it('should add a policy when submitting the add policy form', () => {
      const addButton = fixture.nativeElement.querySelector('form button[type="submit"]');
      const inputFields = fixture.nativeElement.querySelectorAll('form input');
      const samplePolicy = {
        policyName: 'Health Insurance',
        policyDescription: 'Covers health expenses',
        policyAmount: 500,
        policyType: 'Health',
      };

      inputFields[0].value = samplePolicy.policyName;
      inputFields[0].dispatchEvent(new Event('input'));
      inputFields[1].value = samplePolicy.policyDescription;
      inputFields[1].dispatchEvent(new Event('input'));
      inputFields[2].value = samplePolicy.policyAmount;
      inputFields[2].dispatchEvent(new Event('input'));
      inputFields[3].value = samplePolicy.policyType;
      inputFields[3].dispatchEvent(new Event('input'));

      addButton.click();
      fixture.detectChanges();

      expect(component.policies.length).toBe(1);
      expect(component.policies[0]).toEqual({
        ...samplePolicy,
        id: 1,
      });
    });

    it('should have initial policies array empty', () => {
      expect(component.policies).not.toBeNull();
      expect(component.policies).toEqual([]);
    });

    it('should add a new policy', () => {
      component.newPolicy = {
        id: 1,
        policyName: 'Life Insurance',
        policyDescription: 'Covers life risks',
        policyAmount: 1000,
        policyType: 'Life',
      };
      component.addPolicy();
      expect(component.policies).not.toBeNull();
      expect(component.policies.length).toBe(1);
    });

    it('should not add a policy with empty fields', () => {
      component.newPolicy = {
        id: 0,
        policyName: '',
        policyDescription: '',
        policyAmount: 0,
        policyType: '',
      };
      component.addPolicy();
      expect(component.policies).not.toBeNull();
      expect(component.policies.length).toBe(1);
    });

    it('should edit a policy and update it', () => {
      component.newPolicy = {
        id: 1,
        policyName: 'Health Insurance',
        policyDescription: 'Covers health expenses',
        policyAmount: 500,
        policyType: 'Health',
      };
      component.addPolicy();

      component.editPolicy(component.policies[0]);
      const updatedPolicy = {
        id: component.policies[0].id,
        policyName: 'Updated Insurance',
        policyDescription: 'Updated Description',
        policyAmount: 1000,
        policyType: 'Updated',
      };
      component.editedPolicy = { ...updatedPolicy };
      component.saveEditedPolicy();
      expect(component.policies).not.toBeNull();
      expect(component.policies[0]).not.toBeNull();
      expect(component.policies[0]).toEqual(updatedPolicy);
    });

    it('should not edit a policy with empty fields', () => {
      component.newPolicy = {
        id: 1,
        policyName: 'Health Insurance',
        policyDescription: 'Covers health expenses',
        policyAmount: 500,
        policyType: 'Health',
      };
      component.addPolicy();

      component.editPolicy(component.policies[0]);
      const originalPolicy = { ...component.policies[0] };
      component.newPolicy = {
        id: originalPolicy.id,
        policyName: '',
        policyDescription: '',
        policyAmount: 0,
        policyType: '',
      };
      component.saveEditedPolicy();
      expect(component.policies).not.toBeNull();
      expect(component.policies[0]).not.toBeNull();
      expect(component.policies[0]).toEqual(originalPolicy);
    });

    it('should delete a policy', () => {
      component.newPolicy = {
        id: 1,
        policyName: 'Health Insurance',
        policyDescription: 'Covers health expenses',
        policyAmount: 500,
        policyType: 'Health',
      };
      component.addPolicy();

      expect(component.policies).not.toBeNull();
      expect(component.policies.length).toBe(1);
      component.deletePolicy(component.policies[0]);
      expect(component.policies.length).toBe(0);
    });

    it('should cancel editing', () => {
      component.editPolicy({
        id: 1,
        policyName: 'Health Insurance',
        policyDescription: 'Covers health expenses',
        policyAmount: 500,
        policyType: 'Health',
      });
      component.cancelEdit();
      expect(component.isEditing).toBe(false);
      expect(component.editedPolicy).toEqual({});
    });

    it('should filter policies based on search keyword', () => {
      component.newPolicy = {
        id: 1,
        policyName: 'Health Insurance',
        policyDescription: 'Covers health expenses',
        policyAmount: 500,
        policyType: 'Health',
      };
      component.addPolicy();

      component.searchKeyword = 'Insurance';
      expect(component.filteredPolicies.length).toBe(1);

      component.searchKeyword = 'Life';
      expect(component.filteredPolicies.length).toBe(0);
    });
  });
});

