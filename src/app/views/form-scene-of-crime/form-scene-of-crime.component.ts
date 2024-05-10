import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { format } from 'date-fns';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'abet-form-scene-of-crime',
  templateUrl: './form-scene-of-crime.component.html',
  styleUrls: ['./form-scene-of-crime.component.scss']
})
export class FormSceneOfCrimeComponent implements OnInit {
  form!: FormGroup;

  fir_id = '';

  readonly_state = {
    district: true,
    ps: true,
    year: true,
    fir_gd: true,
    date: true,
  }

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
      next: (res: any) => {
        this.form.patchValue({
          meta: {
            district: 'Chandigarh',
            ps: res.case.police_station,
            year: format(new Date(res.case.date), 'yyyy'),
            fir_gd: res.case.FIRno,
            date: format(new Date(res.case.date), 'dd/MM/yyyy')
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
        });
      },
      error: (err) => {
        this.readonly_state = {
          district: false,
          ps: false,
          year: false,
          fir_gd: false,
          date: false,
        };
      },
    })

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
  }

  $table = [
    {
      acts: '',
      section: '',
    },
  ];

  $exhibits_lifted = [
    {
      exhibit: '',
      remarks: '',
    },
  ]

  initForm() {
    return this._formBuilder.group({
      meta: this._formBuilder.group({
        district: ['', [Validators.required]],
        ps: ['', [Validators.required]],
        year: ['', [Validators.required]],
        fir_gd: ['', [Validators.required]],
        date: ['', [Validators.required]],
      }),

      descroption_scene_crime: ['', [Validators.required]],

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

  addExhibitsLifted() {
    this.$exhibits_lifted.push({
      exhibit: '',
      remarks: '',
    });
  }

  removeExhibitsLifted(index: number) {
    this.$exhibits_lifted.splice(index, 1);
  }

  prepraeData() {
    var data = {
      meta: this.meta.value,
      table: this.$table,
      
      descroption_scene_crime: this.form.value.descroption_scene_crime,

      exhibits_lifted: this.$exhibits_lifted,

      witness: this.witness.value,
      other_witness: this.form.value.other_witness,
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

      doc.text('Description of Scene of Crime', 14, 64);

      doc.text(data.descroption_scene_crime, 14, 68);

      doc.text('Exhibits Lifted', 14, 80);

      autoTable(doc, {
        startY: 84,
        head: [['Exhibit', 'Remarks']],
        body: data.exhibits_lifted.map((exhibit) => [
          exhibit.exhibit,
          exhibit.remarks,
        ]),
      });

      doc.text('Witness', 14, 100);

      autoTable(doc, {
        // dynamic height
        startY: 104 + (data.exhibits_lifted.length + 1) * 10 + 10,
        head: [['Name', 'Father Name', 'Age', 'Occupation', 'Address']],
        body: [
          [
            data.witness.name,
            data.witness.father_name,
            data.witness.age,
            data.witness.occupation,
            data.witness.address,
          ],
        ],
      });

      doc.text('Other Witness', 14, 140);

      autoTable(doc, {
        // dynamic height
        startY: 144 + (data.exhibits_lifted.length + 1) * 10 + 10,
        head: [['Name', 'Father Name', 'Age', 'Occupation', 'Address']],
        body: [
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

      this._httpService.postFIRPDF(formData, this.fir_id).subscribe({
        next: (res) => {
          // download pdf
        },
        error: (err) => {
          console.log(err);
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  areAllTablesFilled() {
    return this.$table.every((table) => table.acts && table.section);
  }

  areAllExhibitsLiftedFilled() {
    return this.$exhibits_lifted.every(
      (exhibit) => exhibit.exhibit && exhibit.remarks
    );
  }

  isFormValid() {
    return (
      this.form.valid &&
      this.areAllTablesFilled() &&
      this.areAllExhibitsLiftedFilled()
    );
  }
}