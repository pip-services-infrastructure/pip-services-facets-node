import { Factory } from 'pip-services3-components-node';
import { Descriptor } from 'pip-services3-commons-node';

import { FacetsMongoDbPersistence } from '../persistence/FacetsMongoDbPersistence';
import { FacetsFilePersistence } from '../persistence/FacetsFilePersistence';
import { FacetsMemoryPersistence } from '../persistence/FacetsMemoryPersistence';
import { FacetsController } from '../logic/FacetsController';
import { FacetsHttpServiceV1 } from '../services/version1/FacetsHttpServiceV1';

export class FacetsServiceFactory extends Factory {
	public static Descriptor = new Descriptor("pip-services-facets", "factory", "default", "default", "1.0");
	public static MemoryPersistenceDescriptor = new Descriptor("pip-services-facets", "persistence", "memory", "*", "1.0");
	public static FilePersistenceDescriptor = new Descriptor("pip-services-facets", "persistence", "file", "*", "1.0");
	public static MongoDbPersistenceDescriptor = new Descriptor("pip-services-facets", "persistence", "mongodb", "*", "1.0");
	public static ControllerDescriptor = new Descriptor("pip-services-facets", "controller", "default", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("pip-services-facets", "service", "http", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(FacetsServiceFactory.MemoryPersistenceDescriptor, FacetsMemoryPersistence);
		this.registerAsType(FacetsServiceFactory.FilePersistenceDescriptor, FacetsFilePersistence);
		this.registerAsType(FacetsServiceFactory.MongoDbPersistenceDescriptor, FacetsMongoDbPersistence);
		this.registerAsType(FacetsServiceFactory.ControllerDescriptor, FacetsController);
		this.registerAsType(FacetsServiceFactory.HttpServiceDescriptor, FacetsHttpServiceV1);
	}
	
}
