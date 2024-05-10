import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { format } from 'date-fns';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'abet-form-search-n-seizure',
  templateUrl: './form-search-n-seizure.component.html',
  styleUrls: ['./form-search-n-seizure.component.scss'],
})
export class FormSearchNSeizureComponent implements OnInit {
  form!: FormGroup;

  fir_id = '';

  readonly_state = {
    district: true,
    ps: true,
    year: true,
    fir_gd: true,
    date: true,
  };

  constructor(
    private _formBuilder: FormBuilder,
    private _httpService: HttpService,
    private _activatedRouter: ActivatedRoute
  ) {
    this.form = this.initForm();
  }

  ngOnInit(): void {
    // get fir_id from route
    this.fir_id = this._activatedRouter.snapshot.params['fir_id'];

    this._httpService.getFIRData(this.fir_id).subscribe({
      next: (res: any) => {},
      error: (err) => {
        this.readonly_state = {
          district: false,
          ps: false,
          year: false,
          fir_gd: false,
          date: false,
        };
      },
    });

    this.form.patchValue({
      meta: {
        district: 'District 1',
        ps: 'PS 1',
        year: 'Year 1',
        fir_gd: 'FIR/GD 1',
        date: format(new Date(), 'yyyy-MM-dd'),
      },

      property_siezed: {
        property_seized: 'Property Seized 1',
        property_seized_date: 'Property Seized Date 1',
        property_seized_time: 'Property Seized Time 1',
        property_seized_place: 'Property Seized Place 1',
        desc_of_place: 'Desc of Place 1',
      },

      person_from_whom_recovered: {
        name: 'Name 1',
        father_name: 'Father Name 1',
        age: 'Age1',
        sex: 'Male',
        occupation: 'Occupation 1',
      },

      witness: {
        name: 'Witness Name 1',
        father_name: 'Witness Father Name 1',
        age: 'Witness Age 1',
        occupation: 'Witness Occupation 1',
        address: 'Witness Address 1',
      },

      other_witness: {
        name: 'Other Witness Name 1',
        father_name: 'Other Witness Father Name 1',
        age: 'Other Witness Age 1',
        occupation: 'Other Witness Occupation 1',
        address: 'Other Witness Address 1',
      },
    });

    //  add dummy data
    this.$table = [
      {
        acts: 'Act 1',
        section: 'Section 1',
      },
      {
        acts: 'Act 2',
        section: 'Section 2',
      },
    ];

    this.$nature_of_property = [
      {
        nature: 'Nature 1',
        category: 'Category 1',
        type: 'Type 1',
        description: 'Description 1',
      },
      {
        nature: 'Nature 2',
        category: 'Category 2',
        type: 'Type 2',
        description: 'Description 2',
      },
    ];

    this.$details_of_property = [
      {
        category: 'Category 1',
        belongs_to: 'Belongs To 1',
        value: 'Value 1',
      },
      {
        category: 'Category 2',
        belongs_to: 'Belongs To 2',
        value: 'Value 2',
      },
    ];
  }

  $table = [
    {
      acts: '',
      section: '',
    },
  ];

  $nature_of_property = [
    {
      nature: '',
      category: '',
      type: '',
      description: '',
    },
  ];

  $details_of_property = [
    {
      category: '',
      belongs_to: '',
      value: '',
    },
  ];

  initForm() {
    return this._formBuilder.group({
      meta: this._formBuilder.group({
        district: ['', [Validators.required]],
        ps: ['', [Validators.required]],
        year: ['', [Validators.required]],
        fir_gd: ['', [Validators.required]],
        date: ['', [Validators.required]],
      }),

      property_siezed: this._formBuilder.group({
        property_seized: ['', [Validators.required]],
        property_seized_date: ['', [Validators.required]],
        property_seized_time: ['', [Validators.required]],
        property_seized_place: ['', [Validators.required]],
        desc_of_place: ['', [Validators.required]],
      }),

      person_from_whom_recovered: this._formBuilder.group({
        name: ['', [Validators.required]],
        father_name: ['', [Validators.required]],
        age: ['', [Validators.required]],
        sex: ['', [Validators.required]],
        occupation: ['', [Validators.required]],
      }),

      professional_reciver_of_property: ['yes', [Validators.required]],

      witness: this._formBuilder.group({
        name: ['', [Validators.required]],
        father_name: ['', [Validators.required]],
        age: ['', [Validators.required]],
        occupation: ['', [Validators.required]],
        address: ['', [Validators.required]],
      }),

      other_witness: this._formBuilder.group({
        name: ['', [Validators.required]],
        father_name: ['', [Validators.required]],
        age: ['', [Validators.required]],
        occupation: ['', [Validators.required]],
        address: ['', [Validators.required]],
      }),
    });
  }

  get meta() {
    return this.form.get('meta') as FormGroup;
  }

  get property_siezed() {
    return this.form.get('property_siezed') as FormGroup;
  }

  get person_from_whom_recovered() {
    return this.form.get('person_from_whom_recovered') as FormGroup;
  }

  get witness() {
    return this.form.get('witness') as FormGroup;
  }

  addTable() {
    this.$table.push({
      acts: '',
      section: '',
    });
  }

  removeTable(index: number) {
    this.$table.splice(index, 1);
  }

  addNatureOfProperty() {
    this.$nature_of_property.push({
      nature: '',
      category: '',
      type: '',
      description: '',
    });
  }

  removeNatureOfProperty(index: number) {
    this.$nature_of_property.splice(index, 1);
  }

  addDetailsOfProperty() {
    this.$details_of_property.push({
      category: '',
      belongs_to: '',
      value: '',
    });
  }

  removeDetailsOfProperty(index: number) {
    this.$details_of_property.splice(index, 1);
  }

  prepraeData() {
    var data = {
      meta: this.meta.value,
      property_siezed: this.property_siezed.value,
      person_from_whom_recovered: this.person_from_whom_recovered.value,
      witness: this.witness.value,
      table: this.$table,
      nature_of_property: this.$nature_of_property,
      details_of_property: this.$details_of_property,
      other_witness: this.form.value.other_witness,
      professional_reciver_of_property:
        this.form.value.professional_reciver_of_property,
    };

    // data to pdf using jsPDF and create table in pdf using jspdf-autotable

    try {
      const doc = new jsPDF();

      doc.text('PROPERTY SEARCH & SEIZURE MEMO', 11, 8);
      doc.setFontSize(10);

      doc.text('Meta', 14, 16);

      autoTable(doc, {
        startY: 20,
        head: [['District', 'PS', 'Year', 'FIR/GD', 'Date']],
        body: [
          [
            data.meta.district,
            data.meta.ps,
            data.meta.year,
            data.meta.fir_gd,
            data.meta.date,
          ],
        ],
      });

      autoTable(doc, {
        startY: 40,
        head: [['Acts', 'Section']],
        body: data.table.map((table) => [table.acts, table.section]),
      });

      doc.text(
        'Property Seized',
        14,
        // dynamic y position
        40 + data.table.length * 10 + 10
      );

      autoTable(doc, {
        startY: 40 + data.table.length * 10 + 14,
        head: [
          [
            'Property Seized',
            'Property Seized Date',
            'Property Seized Time',
            'Property Seized Place',
            'Desc of Place',
          ],
        ],
        body: [
          [
            data.property_siezed.property_seized,
            data.property_siezed.property_seized_date,
            data.property_siezed.property_seized_time,
            data.property_siezed.property_seized_place,
            data.property_siezed.desc_of_place,
          ],
        ],
      });

      doc.text(
        'Person From Whom Recovered',
        14,
        40 + data.table.length * 10 + 14 + 20
      );

      autoTable(doc, {
        startY: 40 + data.table.length * 10 + 14 + 24,
        head: [['Name', 'Father Name', 'Age', 'Sex', 'Occupation']],
        body: [
          [
            data.person_from_whom_recovered.name,
            data.person_from_whom_recovered.father_name,
            data.person_from_whom_recovered.age,
            data.person_from_whom_recovered.sex,
            data.person_from_whom_recovered.occupation,
          ],
        ],
      });

      doc.text(
        'Nature of Property Seized',
        14,
        40 + data.table.length * 10 + 14 + 20 + 20
      );

      autoTable(doc, {
        startY: 40 + data.table.length * 10 + 14 + 20 + 24,
        head: [['Nature', 'Category', 'Type', 'Description']],
        body: data.nature_of_property.map((nature) => [
          nature.nature,
          nature.category,
          nature.type,
          nature.description,
        ]),
      });

      doc.text(
        'Professional receiver of stolen property:' +
          data.professional_reciver_of_property,
        14,
        40 + data.table.length * 10 + 14 + 20 + 20 + 20 +
          data.nature_of_property.length * 10 +
          10
      );

      doc.text(
        'Details of Property Seized',
        14,
        40 + data.table.length * 10 + 14 + 20 + 20 + 20 + 20 + 
          data.nature_of_property.length * 10 +
          20
      );

      autoTable(doc, {
        startY: 40 + data.table.length * 10 + 14 + 20 + 20 + 20 + 24 + 
          data.nature_of_property.length * 10 +
          14
        ,
        head: [['Category', 'Belongs To', 'Value']],
        body: data.details_of_property.map((detail) => [
          detail.category,
          detail.belongs_to,
          detail.value,
        ]),
      });

      doc.text(
        'Witness Details',
        14,
        40 + data.table.length * 10 + 14 + 20 + 20 + 20 + 20 + 20 +
        data.nature_of_property.length * 10 +
        20 + 20
      );

      autoTable(doc, {
        startY: 40 + data.table.length * 10 + 14 + 20 + 20 + 20 + 20 + 20 +
          data.details_of_property.length * 10 +
          14,
        head: [
          [
            'Name',
            'Father Name',
            'Age',
            'Occupation',
            'Address',
          ],
        ],
        body: [
          [
            data.witness.name,
            data.witness.father_name,
            data.witness.age,
            data.witness.occupation,
            data.witness.address,
          ],
          [
            data.other_witness.name,
            data.other_witness.father_name,
            data.other_witness.age,
            data.other_witness.occupation,
            data.other_witness.address,
          ],
        ],
      });
      

      var pdfAttachment = new File([doc.output('blob')], 'doc', {
        type: doc.output('blob').type,
      });

      var formData = new FormData();

      formData.append('pdf', pdfAttachment);

      doc.save(`search-n-seizure-${this.fir_id}.pdf`);
    } catch (error) {
      console.log(error);
    }
  }

  areAllTablesFilled() {
    return this.$table.every((table) => table.acts && table.section);
  }

  areAllNatureOfPropertyFilled() {
    return this.$nature_of_property.every(
      (nature) =>
        nature.nature && nature.category && nature.type && nature.description
    );
  }

  areAllDetailsOfPropertyFilled() {
    return this.$details_of_property.every(
      (detail) => detail.category && detail.belongs_to && detail.value
    );
  }

  isFormValid() {
    return (
      this.form.valid &&
      this.areAllTablesFilled() &&
      this.areAllNatureOfPropertyFilled() &&
      this.areAllDetailsOfPropertyFilled()
    );
  }
}
