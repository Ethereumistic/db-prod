import { type SchemaTypeDefinition } from 'sanity';
import { post } from './post';
import { service } from './service';
import { project } from './project';

export const schemaTypes: SchemaTypeDefinition[] = [post, service, project];
