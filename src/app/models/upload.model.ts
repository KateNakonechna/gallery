export class Upload {
  key: string;
  file: File;
  url: string;
  progress: number;
  crearedOn: Date = new Date();

  constructor(file: File) {
    this.file = file;
  }
}
