import { type SchemaTypeDefinition } from 'sanity';
import { post } from './post';
import { service } from './service';
import { project } from './project';
import { projectCategory } from './projectCategory';

export const schemaTypes: SchemaTypeDefinition[] = [post, service, project, projectCategory];
