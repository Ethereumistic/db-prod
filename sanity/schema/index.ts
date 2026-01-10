import { type SchemaTypeDefinition } from 'sanity';
import { service } from './service';
import { projectCategory } from './projectCategory';
import { work } from './work';

export const schemaTypes: SchemaTypeDefinition[] = [service, projectCategory, work];
