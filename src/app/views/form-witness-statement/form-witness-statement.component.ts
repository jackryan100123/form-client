import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { format } from 'date-fns';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { HttpService } from 'src/app/core/services/http.service';

import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'abet-form-witness-statement',
  templateUrl: './form-witness-statement.component.html',
  styleUrls: ['./form-witness-statement.component.scss']
})
export class FormWitnessStatementComponent implements OnInit {
  form!: FormGroup;

  user_id = '';

  readonly_state = {
    district: true,
    ps: true,
    year: true,
    fir_gd: true,
    date: true,
  }

  firestore: Firestore = inject(Firestore);

  constructor(
    private _formBuilder: FormBuilder,
    private _httpService: HttpService,
    private _activatedRouter: ActivatedRoute,
  ) {
    this.form = this.initForm();
  }

  ngOnInit(): void {
    // get user_id from route
    this.user_id = this._activatedRouter.snapshot.params['user_id'];

    this._httpService.getFIRData(this.user_id).subscribe({
      next: (res: any) => {
       
      },
      error: (err) => {
        this.readonly_state = {
          district: false,
          ps: false,
          year: false,
          fir_gd: false,
          date: false,
        }
      },
    })
  }

  $table = [
    {
      acts: '',
      section: '',
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

      witness: this._formBuilder.group({
        name: ['', [Validators.required]],
        father_name: ['', [Validators.required]],
        age: ['', [Validators.required]],
        occupation: ['', [Validators.required]],
        address: ['', [Validators.required]],
        statement: ['', [Validators.required]],
        is_agree: [false, [Validators.required]],
      }),
    });
  }

  get meta() {
    return this.form.get('meta') as FormGroup;
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

  prepraeData() {
    var data = {
      meta: this.meta.value,
      witness: this.witness.value,
      table: this.$table,
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

      doc.text('Witness Details', 14, 
        // calculate height based on table length
        40 + (data.table.length * 10) + 10
      );

      autoTable(doc, {
        startY: 40 + (data.table.length * 10) + 14,
        head: [
          [
            'Name',
            'Father Name',
            'Age',
            'Occupation',
            'Address',
            'Statement',
            'Is Agree',
          ],
        ],
        body: [
          [
            data.witness.name,
            data.witness.father_name,
            data.witness.age,
            data.witness.occupation,
            data.witness.address,
            data.witness.statement,
            data.witness.is_agree ? 'Yes' : 'No',
          ],
        ],
      });

      doc.save(`search-n-seizure-${this.user_id}.pdf`);

      // doc as pdf blob
      // var pdf = doc.save('form-search-n-seizure.pdf');

      var pdfAttachment = new File([doc.output('blob')], 'doc', {
        type: doc.output('blob').type,
      });

      var formData = new FormData();

      formData.append('pdf', pdfAttachment);

      this._httpService.postFIRPDF(formData, this.user_id).subscribe({
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

  isFormValid() {
    return (
      this.form.valid &&
      this.areAllTablesFilled() &&
      this.witness.get('is_agree')?.value
    );
  }
}

