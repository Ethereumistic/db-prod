import { type SchemaTypeDefinition } from 'sanity';
import { service } from './service';
import { projectCategory } from './projectCategory';
import { work } from './work';
import { partners } from './partners';

export const schemaTypes: SchemaTypeDefinition[] = [service, projectCategory, work, partners];
