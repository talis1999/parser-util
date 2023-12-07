import { ParseSchema, Schema } from "./dataParser";

/**
 * Molds data to new data with new format using original data values.
 * #important - Current version has a limitation, schemas with arrayRef limited to the array's scope (see the example in index.ts).
 *
 * @param {Schema} schema - A map of the new keys - paths to the "original data" values/ nested schemas (ParseSchemas).
 * The schema would be applied to each array item if arrayRef arg been passed.
 * @param {ParseSchema["arrayRef"] | null} arrayRef - Optional, the path to the "original data" array value of which, a new array will be created.
 * @returns {ParseSchema} - The "total" schema, conatins the args we passing in this func.
 */

const createSchema = (
  schema: Schema,
  arrayRef: ParseSchema["arrayRef"] | null = null
): ParseSchema => {
  const newSchema: ParseSchema = { schema };
  if (arrayRef) newSchema.arrayRef = arrayRef;
  return newSchema;
};

export default createSchema;
