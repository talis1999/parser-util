import { ParseSchema, Schema } from "./dataParser";

const createSchema = (
  schema: Schema,
  arrayRef: ParseSchema["arrayRef"] | null = null
): ParseSchema => {
  const newSchema: ParseSchema = { schema };
  if (arrayRef) newSchema.arrayRef = arrayRef;
  return newSchema;
};

export default createSchema;
