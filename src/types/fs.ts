export type FileExtension = 'md' | 'yaml' | 'json' | 'pdf' | 'txt';

export interface FSFile {
  name: string;
  type: 'file';
  extension: FileExtension;
  path: string;
  content: string;
}

export interface FSDirectory {
  name: string;
  type: 'directory';
  path: string;
  children: (FSFile | FSDirectory)[];
}

export type FSNode = FSFile | FSDirectory;
