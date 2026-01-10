import { type SchemaTypeDefinition } from 'sanity';
import { post } from './post';
import { service } from './service';
import { project } from './project';
import { projectCategory } from './projectCategory';
import { work } from './work';

export const schemaTypes: SchemaTypeDefinition[] = [post, service, project, projectCategory, work];
