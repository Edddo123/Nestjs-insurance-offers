import { getConnection, createConnection } from 'typeorm';

global.beforeEach(async () => {
  const connection = await createConnection();
  const entities = connection.entityMetadatas;
  for (const entity of entities) {
    const repository = getConnection().getRepository(entity.name); // Get repository
    await repository.delete({}); // Clear each entity table's content
  }
  await connection.close();
});

global.afterEach(async () => {
  const connection = getConnection();

  await connection.close();
});
