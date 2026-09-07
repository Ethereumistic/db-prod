import { type SchemaTypeDefinition } from 'sanity';
import { service } from './service';
import { projectCategory } from './projectCategory';
import { work } from './work';
import { partners } from './partners';
import { portfolioSettings } from './portfolioSettings';

export const schemaTypes: SchemaTypeDefinition[] = [service, projectCategory, work, partners, portfolioSettings];
