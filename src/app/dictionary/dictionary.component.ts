import { Component } from '@angular/core';
import { DictionaryServiceService } from '../dictionary-service.service';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {DatePipe} from '@angular/common';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-dictionary',
  standalone: true,
  imports: [FormsModule, CommonModule,HttpClientModule,MatButtonModule,MatCardModule,MatChipsModule,MatIconModule,MatListModule],
  providers:[DictionaryServiceService],
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.css'] // Corrected here
})
export class DictionaryComponent {
  word: string = '';
  definitions: { definition: string, example: string }[] = [];
  example: string = '';
  synonyms: string[] = [];
  audioUrl: string = '';
  err : string='';

  constructor(private dictionaryService: DictionaryServiceService) { }

  // searchWord() {
  //   this.dictionaryService.search(this.word).subscribe(
  //     data => {
  //       if (data && data.length > 0) {
  //         const entry = data[0];
  //         if (entry.meanings && entry.meanings.length > 0) {
  //           this.definitions = entry.meanings.flatMap((meaning: { definitions: any[]; }) =>
  //             meaning.definitions.map(def => ({
  //               definition: def.definition,
  //               example: def.example || 'No example available'
  //             }))
  //           );
  //           // this.synonyms = entry.meanings.flatMap((meaning: { definitions: any[]; }) =>
  //           //   meaning.definitions.map(def => ({
  //           //     synonyms: def.synonyms
  //           //   }))
  //           // );
  //           this.synonyms = entry.meanings.flatMap((meaning: { synonyms: any[] }) =>
  //             meaning.synonyms
  //           );
          
  //           this.audioUrl = entry.phonetics.find((p: { audio: any; }) => p.audio)?.audio || '';
  //         }
  //       }
  //     },
  //     error => {
  //       console.error('Error fetching data:', error);
  //     }
  //   );
  // }
  searchWord(word:any) {
    this.word = word;
    this.dictionaryService.search(this.word).subscribe(
      data => {
        if (data && data.length > 0) {
          const entry = data[0];
          if (entry.meanings && entry.meanings.length > 0) {
            this.definitions = entry.meanings.flatMap((meaning: { definitions: any[]; }) =>
              meaning.definitions.map(def => ({
                definition: def.definition,
                example: def.example || 'No example available'
              }))
            ).slice(0, 5); // Limit to 5 definitions
            this.synonyms = entry.meanings.flatMap((meaning: { synonyms: any[] }) =>
              meaning.synonyms
            ).slice(0, 10); // Limit to 6 synonyms
            
            this.audioUrl = entry.phonetics.find((p: { audio: any; }) => p.audio)?.audio || '';
          }
        }
        this.err = "";
      },
      error => {
        console.error('Error fetching data:', error);
          this.err = "Sorry pal, we couldn't find definitions for the word you were looking for";
      }
    );
  }
  
}
